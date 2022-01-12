import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

const appRouter = trpc.router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .mutation('add_words', {
    input: z
      .object({
        email: z.string().nullish(),
        words: z.object({
          text: z.string(),
          count: z.number().positive(),
        }).array()
      }),
    resolve({input}) {
      console.log(  )
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});