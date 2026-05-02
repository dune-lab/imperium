import { base, boundaries } from '@enxoval/quality';

export default [
  ...base(),
  ...boundaries([
    { name: 'diplomat-server', pattern: ['src/diplomat/http-server/**'], allow: ['controllers', 'wire', 'model'] },
    { name: 'diplomat-client', pattern: ['src/diplomat/http-client/**'], allow: ['wire', 'model'] },
    { name: 'controllers', pattern: ['src/controllers/**'], allow: ['diplomat-client', 'model', 'wire'] },
    { name: 'adapters', pattern: ['src/adapters/**'], allow: ['model', 'wire'] },
    { name: 'model', pattern: ['src/model/**'], allow: [] },
    { name: 'wire', pattern: ['src/wire/**'], allow: [] },
  ]),
];
