import * as express from 'express';
import { Config, JsonDB } from 'node-json-db';
import { resolve } from 'path';

type ReturnData = object | undefined;

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

// This funky directory because this code is run from the root of the workspace
const dbFile = resolve('apps/server/src/assets/db/db');
const db = new JsonDB(new Config(dbFile, true, false, '/'));
let read: Record<string, Record<string, object>> | null;

const router = express.Router();

function getWorkspaces(): object {
  if (!isNonNull(read) || !isNonNull(read.workspaces)) {
    return {};
  }
  const workspace = read.workspaces;
  return Object.keys(read.workspaces).map((id) => workspace[id]);
}

router.get('/workspaces', (req, res): void => {
  void (async () => {
    read = (await db.getData('/')) as Record<string, Record<string, object>>;
    res.send(getWorkspaces());
  })();
});

const commonPost = (ids: string[], table: string): ReturnData => {
  if (!isNonNull(read) || !isNonNull(read[table])) {
    return;
  }
  const n = read[table];
  return ids.map((id) => n[id]);
};

const commonChildren = (ids: string[], table: string): ReturnData => {
  if (!isNonNull(read) || !isNonNull(read['children'])) {
    return;
  }
  const n = read['children'][table] as Record<string, object>;
  return ids.map((id) => n[id]);
};

router.post('/spaces', (req, res) => {
  res.send(commonPost(req.body as string[], 'spaces'));
});

router.post('/folders', (req, res) => {
  res.send(commonChildren(req.body as string[], 'folders'));
});

router.post('/lists', (req, res) => {
  res.send(commonChildren(req.body as string[], 'lists'));
});

router.post('/docs', (req, res) => {
  res.send(commonChildren(req.body as string[], 'docs'));
});

router.post('/sprintFolders', (req, res) => {
  res.send(commonChildren(req.body as string[], 'sprint-folders'));
});

router.post('/children', (req, res) => {
  const ids = req.body as string[];
  res.send(
    ids.map((id) => commonChildren([id.split(':')[1]], id.split(':')[0]))
  );
});
export { router };
