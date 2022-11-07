package ru.pepegma.asd.queens;
public class SolveQueens implements Solution{

    private static int N;
    private static int[][] board;
    public SolveQueens(int n) {
        N = n;
        board = new int[N][N];
        solve(0);
    }

    public void getSolution()
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(" " + board[i][j]
                        + " ");
            System.out.println();
        }
    }
    private static boolean check(int board[][], int row, int col)
    {
        int i, j;
        for (i = 0; i < col; i++)
            if (board[row][i] == 1)
                return false;
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 1)
                return false;
        for (i = row, j = col; j >= 0 && i < N; i++, j--)
            if (board[i][j] == 1)
                return false;
        return true;
    }
    private static boolean solve(int col)
    {
        if (col >= N)
            return true;
        for (int i = 0; i < N; i++) {
            if (check(board, i, col)) {
                board[i][col] = 1;

                if (solve( col + 1))
                    return true;
                board[i][col] = 0;
            }
        }
        return false;
    }

}
