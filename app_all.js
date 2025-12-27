"use strict";
const express = require("express");
const app = express();

// 共通設定
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
// ■ トップページ (メニュー画面)
app.get("/", (req, res) => {
  res.render('top');
});

//  【1つ目】 NBAチーム紹介アプリ (/nba)
// ■ データ置き場（NBA全30チーム）
let nbaTeams = [
  // ==========================================
  // 【EASTERN CONFERENCE】 (イースト)
  // ==========================================
  { id: 1, name: "Boston Celtics", conf: "East", arena: "TD Garden", star: "Jayson Tatum" },
  { id: 2, name: "Miami Heat", conf: "East", arena: "Kaseya Center", star: "Jimmy Butler" },
  { id: 3, name: "Chicago Bulls", conf: "East", arena: "United Center", star: "Zach LaVine" },
  { id: 4, name: "Milwaukee Bucks", conf: "East", arena: "Fiserv Forum", star: "Giannis Antetokounmpo" },
  { id: 5, name: "Philadelphia 76ers", conf: "East", arena: "Wells Fargo Center", star: "Joel Embiid" },
  { id: 6, name: "Cleveland Cavaliers", conf: "East", arena: "Rocket Mortgage FieldHouse", star: "Donovan Mitchell" },
  { id: 7, name: "New York Knicks", conf: "East", arena: "Madison Square Garden", star: "Jalen Brunson" },
  { id: 8, name: "Orlando Magic", conf: "East", arena: "Kia Center", star: "Paolo Banchero" },
  { id: 9, name: "Indiana Pacers", conf: "East", arena: "Gainbridge Fieldhouse", star: "Tyrese Haliburton" },
  { id: 10, name: "Atlanta Hawks", conf: "East", arena: "State Farm Arena", star: "Trae Young" },
  { id: 11, name: "Brooklyn Nets", conf: "East", arena: "Barclays Center", star: "Cam Thomas" },
  { id: 12, name: "Toronto Raptors", conf: "East", arena: "Scotiabank Arena", star: "Scottie Barnes" },
  { id: 13, name: "Charlotte Hornets", conf: "East", arena: "Spectrum Center", star: "LaMelo Ball" },
  { id: 14, name: "Washington Wizards", conf: "East", arena: "Capital One Arena", star: "Kyle Kuzma" },
  { id: 15, name: "Detroit Pistons", conf: "East", arena: "Little Caesars Arena", star: "Cade Cunningham" },

  // ==========================================
  // 【WESTERN CONFERENCE】 (ウェスト)
  // ==========================================
  { id: 16, name: "Los Angeles Lakers", conf: "West", arena: "Crypto.com Arena", star: "LeBron James" },
  { id: 17, name: "Golden State Warriors", conf: "West", arena: "Chase Center", star: "Stephen Curry" },
  { id: 18, name: "Denver Nuggets", conf: "West", arena: "Ball Arena", star: "Nikola Jokic" },
  { id: 19, name: "Oklahoma City Thunder", conf: "West", arena: "Paycom Center", star: "Shai Gilgeous-Alexander" },
  { id: 20, name: "Minnesota Timberwolves", conf: "West", arena: "Target Center", star: "Anthony Edwards" },
  { id: 21, name: "LA Clippers", conf: "West", arena: "Intuit Dome", star: "Kawhi Leonard" },
  { id: 22, name: "Dallas Mavericks", conf: "West", arena: "American Airlines Center", star: "Luka Doncic" },
  { id: 23, name: "Phoenix Suns", conf: "West", arena: "Footprint Center", star: "Kevin Durant" },
  { id: 24, name: "New Orleans Pelicans", conf: "West", arena: "Smoothie King Center", star: "Zion Williamson" },
  { id: 25, name: "Sacramento Kings", conf: "West", arena: "Golden 1 Center", star: "De'Aaron Fox" },
  { id: 26, name: "Houston Rockets", conf: "West", arena: "Toyota Center", star: "Alperen Sengun" },
  { id: 27, name: "Utah Jazz", conf: "West", arena: "Delta Center", star: "Lauri Markkanen" },
  { id: 28, name: "Memphis Grizzlies", conf: "West", arena: "FedExForum", star: "Ja Morant" },
  { id: 29, name: "San Antonio Spurs", conf: "West", arena: "Frost Bank Center", star: "Victor Wembanyama" },
  { id: 30, name: "Portland Trail Blazers", conf: "West", arena: "Moda Center", star: "Jerami Grant" }
];
// 一覧
app.get("/nba", (req, res) => res.render('nba_list', { data: nbaTeams }));

// 新規登録 (HTMLフォームからの受信)
app.post("/nba/create", (req, res) => {
  const id = nbaTeams.length + 1;
  const newData = {
    id: id,
    name: req.body.name,
    conf: req.body.conf,
    arena: req.body.arena,
    star: req.body.star
  };
  nbaTeams.push(newData);
  res.redirect('/nba');
});

// 編集画面
app.get("/nba/edit/:id", (req, res) => {
  const index = req.params.id;
  res.render('nba_edit', { data: nbaTeams[index], id: index });
});

// 更新処理
app.post("/nba/update/:id", (req, res) => {
  const index = req.params.id;
  nbaTeams[index].name = req.body.name;
  nbaTeams[index].conf = req.body.conf;
  nbaTeams[index].arena = req.body.arena;
  nbaTeams[index].star = req.body.star;
  res.redirect('/nba');
});

// 削除処理
app.post("/nba/delete/:id", (req, res) => {
  const index = req.params.id;
  nbaTeams.splice(index, 1);
  res.redirect('/nba');
});

// 詳細表示 (一番最後)
app.get("/nba/:id", (req, res) => {
  const index = req.params.id;
  if (nbaTeams[index]) {
    res.render('nba_detail', { data: nbaTeams[index], id: index });
  } else {
    res.send("データが見つかりません");
  }
});


//  【2つ目】 WurtS 楽曲管理アプリ (/wurts)
let songs = [
  // --- アルバム『作詞作曲部』(2022) ---
  { id: 1, title: "ふたり計画", album: "作詞作曲部", year: "2022" },
  { id: 2, title: "Talking Box (Dirty Pop Remix)", album: "作詞作曲部", year: "2022" },
  { id: 3, title: "SPACESHIP", album: "作詞作曲部", year: "2022" },
  { id: 4, title: "SWAM", album: "作詞作曲部", year: "2022" },
  { id: 5, title: "タイムラグ！", album: "作詞作曲部", year: "2022" },
  { id: 6, title: "コズミック", album: "作詞作曲部", year: "2022" },
  { id: 7, title: "MOONRAKER", album: "作詞作曲部", year: "2022" },
  { id: 8, title: "メルト", album: "作詞作曲部", year: "2022" },

  // --- アルバム『W's Project』(2021) ---
  { id: 9, title: "Talking Box", album: "W's Project", year: "2021" },
  { id: 10, title: "Lemonade", album: "W's Project", year: "2021" },
  { id: 11, title: "SIREN", album: "W's Project", year: "2021" },
  { id: 12, title: "NERDY", album: "W's Project", year: "2021" },
  { id: 13, title: "ブルーベリーハニー", album: "W's Project", year: "2021" },
  { id: 14, title: "オートマチック", album: "W's Project", year: "2021" },
  { id: 15, title: "BOY MEETS GIRL", album: "W's Project", year: "2021" },

  // --- EP『ワンス・アポン・ア・リバイバル』(2021) ---
  { id: 16, title: "分かってないよ", album: "ワンス・アポン・ア・リバイバル", year: "2021" },
  { id: 17, title: "魔法のスープ", album: "ワンス・アポン・ア・リバイバル", year: "2021" },
  { id: 18, title: "解夏", album: "ワンス・アポン・ア・リバイバル", year: "2021" },

  // --- 最新シングル・EP・コラボなど ---
  { id: 19, title: "BORDER", album: "Single", year: "2023" },
  { id: 20, title: "BACK", album: "Single", year: "2023" },
  { id: 21, title: "ユートピア", album: "Single", year: "2023" },
  { id: 22, title: "クールじゃない？", album: "Single", year: "2023" },
  { id: 23, title: "SF", album: "Single", year: "2024" },
  { id: 24, title: "ソウルズ", album: "Single", year: "2024" },
  { id: 25, title: "エヴォリューション", album: "Single", year: "2024" },
  { id: 26, title: "NOISE", album: "Single", year: "2024" },
  { id: 27, title: "都会の幽霊", album: "Single", year: "2024" },
  { id: 28, title: "Capital Bible", album: "Single", year: "2021" },
  { id: 29, title: "リトルダンサー feat. Ito (PEOPLE 1)", album: "Single", year: "2021" },
  { id: 30, title: "地底人", album: "Single", year: "2021" }
];

// 一覧
app.get("/wurts", (req, res) => res.render('wurts_list', { data: songs }));

// 新規登録
app.post("/wurts/create", (req, res) => {
  const id = songs.length + 1;
  const newData = {
    id: id,
    title: req.body.title,
    album: req.body.album,
    year: req.body.year
  };
  songs.push(newData);
  res.redirect('/wurts');
});

// 編集画面
app.get("/wurts/edit/:id", (req, res) => {
  const index = req.params.id;
  res.render('wurts_edit', { data: songs[index], id: index });
});

// 更新処理
app.post("/wurts/update/:id", (req, res) => {
  const index = req.params.id;
  songs[index].title = req.body.title;
  songs[index].album = req.body.album;
  songs[index].year = req.body.year;
  res.redirect('/wurts');
});

// 削除処理
app.post("/wurts/delete/:id", (req, res) => {
  const index = req.params.id;
  songs.splice(index, 1);
  res.redirect('/wurts');
});

// 詳細表示
app.get("/wurts/:id", (req, res) => {
  const index = req.params.id;
  if (songs[index]) {
    res.render('wurts_detail', { data: songs[index], id: index });
  } else {
    res.send("データが見つかりません");
  }
});

let muscles = [
  // --------------------------------------------------
  // 【ジム編】 マシン・フリーウエイト（逆三角形を作る）
  // --------------------------------------------------
  { id: 1, menu: "ベンチプレス (胸)", weight: "40kg〜", count: "10回 × 3セット" },
  { id: 2, menu: "ラットプルダウン (背中)", weight: "30kg〜", count: "12回 × 3セット" },
  { id: 3, menu: "ショルダープレス (肩)", weight: "ダンベル10kg", count: "10回 × 3セット" },
  { id: 4, menu: "レッグプレス (脚)", weight: "80kg〜", count: "15回 × 3セット" },
  { id: 5, menu: "ダンベルカール (腕)", weight: "8kg", count: "10回 × 3セット" },
  { id: 6, menu: "ケーブルクランチ (腹筋)", weight: "軽め", count: "20回 × 3セット" },

  // --------------------------------------------------
  // 【家トレ編】 自重トレーニング（引き締め・体幹）
  // --------------------------------------------------
  { id: 7, menu: "スクワット", weight: "自重", count: "20回 × 3セット" },
  { id: 8, menu: "腕立て伏せ", weight: "自重", count: "15回 × 3セット" },
  { id: 9, menu: "懸垂 (チンニング)", weight: "自重", count: "限界まで × 3セット" },
  { id: 10, menu: "プランク", weight: "自重", count: "1分間 × 2セット" },
  { id: 11, menu: "レッグレイズ", weight: "自重", count: "15回 × 3セット" },
  { id: 12, menu: "バーピージャンプ", weight: "自重", count: "30秒 × 2セット" }
];
// 一覧
app.get("/muscle", (req, res) => res.render('muscle_list', { data: muscles }));

// 新規登録
app.post("/muscle/create", (req, res) => {
  const id = muscles.length + 1;
  const newData = {
    id: id,
    menu: req.body.menu,
    weight: req.body.weight,
    count: req.body.count
  };
  muscles.push(newData);
  res.redirect('/muscle');
});

// 編集画面
app.get("/muscle/edit/:id", (req, res) => {
  const index = req.params.id;
  res.render('muscle_edit', { data: muscles[index], id: index });
});

// 更新処理
app.post("/muscle/update/:id", (req, res) => {
  const index = req.params.id;
  muscles[index].menu = req.body.menu;
  muscles[index].weight = req.body.weight;
  muscles[index].count = req.body.count;
  res.redirect('/muscle');
});

// 削除処理
app.post("/muscle/delete/:id", (req, res) => {
  const index = req.params.id;
  muscles.splice(index, 1);
  res.redirect('/muscle');
});

// 詳細表示
app.get("/muscle/:id", (req, res) => {
  const index = req.params.id;
  if (muscles[index]) {
    res.render('muscle_detail', { data: muscles[index], id: index });
  } else {
    res.send("データが見つかりません");
  }
});

// ==================================================
//  サーバー起動
// ==================================================
app.listen(8080, () => console.log("All Apps listening on port 8080!"));