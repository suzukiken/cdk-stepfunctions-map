+++
title = "Step Functionsでmapを使って繰り返し処理をする"
date = "2021-04-11"
tags = ["Step Functions", "Lambda"]
+++

繰り返しやパラレルの処理を作ることができるのがmapタスクだ。

例えば過去１年分の売り上げを月ごとに集計したい、なんていう時には一ヶ月ごとに一つのLambda関数で処理することにして、各Lambda関数に対して処理する月を引数のように与えることができる。

```
{
  "todos": [
    "2021-01-01",
    "2020-12-01",
    "2021-11-01",
  ]
}
```

mapタスクはこれを複数のLambdaに分配して処理してくれる。関数が同時に実行することに問題があるなら、同時に実行できる数を制限することもできる。

![img](/img/2021/04/stepfunctions-map-stepmachine.png)

[繰り返しを使う方法](https://github.com/suzukiken/cdkstepfunctions-loop)と違うのは、mapの場合はあらかじめ上記のように処理するタスクをリストアップしておく必要があるということだ。

[CDKのコード](https://github.com/suzukiken/cdkstepfunctions-map)

