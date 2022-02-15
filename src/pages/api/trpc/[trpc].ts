import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import {z} from 'zod';
import {prisma} from "../../../prismaClient";


const appRouter = trpc.router()
  .mutation('add_words', {
    input: z
      .object({
        email: z.string(),
        words: z.object({
          text: z.string(),
          count: z.number().positive(),
        }).array()
      }),
    async resolve({input}) {
      throw new Error('Method not finished')

      const wordIds = prisma.word.findMany({
        select: {
          id: true,
          text: true,
        },
        where: {
          OR: input.words.map((e) => ({
            text: e.text,
          })),
        }
      });

      prisma.userWord
        .createMany({
          data: input.words.map((w) => {
            return {
              wordId: 3,
              userId: '',
            }
          }),
        })
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});