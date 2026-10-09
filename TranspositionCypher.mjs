class TranspositionCypher
{
    constructor()
    {
    }

    generateTextGrid(plaintext)
    {
        let stringAsGrid = [];
        let sqrRt = Math.ceil(Math.sqrt(plaintext.length));
        while(plaintext.length < sqrRt * sqrRt)
        {
            plaintext = ` ${plaintext} `;
        }
        plaintext=plaintext.substring(0, sqrRt * sqrRt);

        for(let i = 0; i < plaintext.length; i++)
        {
            let char = plaintext.charAt(i);
            let row = Math.floor(i / sqrRt);
            let col = i % sqrRt;
            if(!stringAsGrid[row])
            {
                stringAsGrid[row] = [];
            }
            stringAsGrid[row][col] = char;
        }
        return stringAsGrid;
    }

    transposeGrid(grid)
    {
        const size = grid.length;
        const transposedGrid = [];
        let row = [];

        for (let diagonal = 0; diagonal < size * 2 - 1; diagonal++)
        {
            for (let currentRow = size - 1; currentRow >= 0; currentRow--)
            {
                const currentColumn = diagonal - currentRow;
                if (currentColumn >= 0 && currentColumn < size)
                {
                    row.push(grid[currentRow][currentColumn]);
                    if (row.length === size)
                    {
                        transposedGrid.push(row);
                        row = [];
                    }
                }
            }
        }
        return transposedGrid;
    }

    untransposeGrid(transposedGrid)
    {
        const size = transposedGrid.length;
        const grid = Array.from({length: size}, () => []);
        const characters = transposedGrid.flat();
        let characterIndex = 0;

        for(let diagonal = 0; diagonal < size * 2 - 1; diagonal++)
        {
            for(let currentRow = size - 1; currentRow >= 0; currentRow--)
            {
                const currentColumn = diagonal - currentRow;

                if(currentColumn >= 0 && currentColumn < size)
                {
                    grid[currentRow][currentColumn] = characters[characterIndex];
                    characterIndex++;
                }
            }
        }

        return grid;
    }



    encrypt(plaintext)
    {
        let grid = this.generateTextGrid(plaintext);
        let transposedGrid = this.transposeGrid(grid);
        let cipherText = "";
        for(let row of transposedGrid)
        {
            cipherText += row.join("");
        }
        return cipherText;
    }

    decrypt(ciphertext)
    {
        let transposedGrid = this.generateTextGrid(ciphertext);
        let grid = this.untransposeGrid(transposedGrid);
        let plaintext = "";
        for(let row of grid)
        {
            plaintext += row.join("");
        }
        return plaintext.trim();
    }

}

export default TranspositionCypher;