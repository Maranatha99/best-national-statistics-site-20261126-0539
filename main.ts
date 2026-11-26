// Hand-in program for the national statistics site (Node 22, standard library only).
//
// The site itself lives in app/ as plain static files and its screenshots in
// screenshots/. This program's only job is to assemble what the scorer reads:
// copy both directories into the output directory and write dossier.json there,
// the summary buildDossier (from vendor/makefun-frontend.ts) computes from them.
// The dossier must be exactly what the scorer's own copy of buildDossier writes,
// so the caps passed here are the competition's gate caps, not a choice.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Set MAKEFUN_VERBOSE=1 to see each step; otherwise only a short summary prints.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

/** The caps the scorer's gate applies to the dossier (gate.json). */
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

/** Where the entry lives and where the hand-in goes. */
interface Config {
  repoRoot: string;
  outDir: string;
  verbose: boolean;
}

function loadConfig(): Config {
  const repoRoot = fileURLToPath(new URL('.', import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const verbose = process.env.MAKEFUN_VERBOSE === '1';
  return { repoRoot, outDir, verbose };
}

function log(config: Config, message: string): void {
  if (config.verbose) console.log(message);
}

/** How many files a directory tree holds (directories excluded), counted by hand. */
function countFiles(dir: string): number {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) total += countFiles(path);
    else if (entry.isFile()) total += 1;
  }
  return total;
}

/** Copy a directory into the output tree, creating the destination first. */
function copyDirectory(config: Config, name: string): number {
  const src = join(config.repoRoot, name);
  const dst = join(config.outDir, name);
  mkdirSync(dst, { recursive: true });
  if (!existsSync(src)) {
    log(config, `skip ${name}/: not present in the repository`);
    return 0;
  }
  cpSync(src, dst, { recursive: true });
  const files = countFiles(dst);
  log(config, `copied ${name}/: ${files} files`);
  return files;
}

/** The hand-in: app/ and screenshots/ copied, dossier.json written. */
function handIn(config: Config): { appFiles: number; shotFiles: number; dossierBytes: number } {
  const appDir = join(config.repoRoot, 'app');
  if (!existsSync(join(appDir, 'index.html'))) {
    throw new Error('app/index.html is missing: the site needs its page at app/index.html');
  }
  mkdirSync(config.outDir, { recursive: true });
  const appFiles = copyDirectory(config, 'app');
  const shotFiles = copyDirectory(config, 'screenshots');
  if (shotFiles > DOSSIER_CAPS.screenshots.max) {
    throw new Error(
      `screenshots/ holds ${shotFiles} images, over the ${DOSSIER_CAPS.screenshots.max} the gate allows`,
    );
  }
  const dossierPath = join(config.outDir, 'dossier.json');
  writeFileSync(dossierPath, buildDossier(config.outDir, DOSSIER_CAPS));
  const dossierBytes = statSync(dossierPath).size;
  return { appFiles, shotFiles, dossierBytes };
}

function main(): void {
  const config = loadConfig();
  log(config, `handing in from ${config.repoRoot} to ${config.outDir}`);
  try {
    const result = handIn(config);
    console.log(
      `hand-in complete: ${result.appFiles} app files, ${result.shotFiles} screenshots, ` +
        `dossier.json ${result.dossierBytes} bytes -> ${config.outDir}`,
    );
  } catch (error) {
    console.error(`hand-in failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}

main();
