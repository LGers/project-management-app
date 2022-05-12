export const useCreateBoardApi = () => {
  const createBoard = (params: { name: string }): Promise<void> => {
    console.log(params);
    return Promise.resolve();
  };
  return {
    createBoard,
  };
};
