import { rest } from 'msw';
import { useIndexedDB } from 'react-indexed-db';
const { getAll, add } = useIndexedDB('users');
export const handlers = [
  //login
  rest.post('/login', async (req, res, ctx) => {
    let isMatching;
    await getAll().then((person) => {
      // let selectUser = person.find(({ id }) => id == req.body.id);
      let selectUser = true;
      if (!selectUser) {
        return res(ctx.delay(2000), ctx.status(202), ctx.json(req.body));
      }
      // isMatching = selectUser.id === req.body.id && selectUser.password === req.body.password;
      isMatching = true;
    });
    if (isMatching) {
      return res(ctx.delay(2000), ctx.status(200), ctx.json(req.body));
    } else {
      return res(ctx.delay(2000), ctx.status(202), ctx.json(req.body));
    }
  }),

  //signup
  // rest.post('/signup', async (req, res, ctx) => {
  //   let isUser;
  //   await getAll().then((person) => {
  //     isUser = person.find(({ id }) => id == req.body.id) !== undefined;
  //   });
  //   if (isUser) {
  //     return res(ctx.delay(2000), ctx.status(202), ctx.json(req.body));
  //   } else {
  //     add({ ...req.body });
  //     return res(ctx.delay(2000), ctx.status(200), ctx.json(req.body));
  //   }
  // }),
];
