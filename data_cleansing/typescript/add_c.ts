//クリッペンドルフα係数をR言語ですぐ使えるようにするために、Denoを用いてTypeScriptでR言語に書く文を作る。
//CSVから使うとなぜかエラーでつかえない。代わりに以下をコマンドラインで出力するようにした。
// d0 <- c(7,7,7)
// d1 <- c(7,7,6)
// d2 <- c(7,7,6)
// d <- cbind(d0,d1,d2)
import { parse } from "https://deno.land/std@0.79.0/encoding/csv.ts";
import { BufReader } from "https://deno.land/std@0.79.0/io/bufio.ts";

//読み取りたいCSVファイルをここに。
const file = await Deno.open("../通訳品質5（フライスのカッパ）.csv");
try {
    const buf = BufReader.create(file);
    const result = await parse(buf);
    c_add(result);
} finally {
    file.close();
}

function c_add(csv: any) {
//まず、数値が文字列となってるため、数値に変換する。
    const result = [];
    for (const row of csv) {
        const reRow = [];
        for (const cell of row) {
            reRow.push(Number(cell));
        }
        result.push(reRow);
    }
//ヘッダーはいらないため、削除
    result.shift();
    console.log(result);
//以下を出力するプログラム
// d0 <- c(7,7,7)
// d1 <- c(7,7,6)
// d2 <- c(7,7,6)
    let str = "";
    let count = 0;
    for (const row of result) {
        str = str + `d${count} <- c(`;
        count++;
        for (let i = 0; i < row.length; i++) {
            if (i === row.length - 1) str = str + row[i];
            else str = str + row[i] + ",";
        }
        str = str + ")\n";
    }
//以下を出力するプログラム
// d <- cbind(d0,d1,d2)
    let cbindStr = "d <- cbind(";
    for (let i = 0; i <= count; i++) {
        if (i < count - 1) cbindStr = cbindStr + "d" + i + ",";
        else {
            cbindStr = cbindStr + "d" + i + ")"
            break;
        };
    }
    console.log(str);
    console.log(cbindStr);
}
