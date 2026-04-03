
const LIBS = [
  {
    id: 'anime',
    ico: '<img src="images/karenneko.gif" alt="karenneko" style="width: 24px; height: 24px;">',
    name: 'Anime',
    desc: 'A style of Japanese film and television animation.',
    colls: ['en-stream', 'licensed', 'self-hosted', 'foreign', 'android', 'desktop', 'torrents'],
  },
  {
    id: 'manga',
    ico: '<img src="images/PopukoThink.png" alt="popukothink" style="width: 24px; height: 24px;">',
    name: 'Manga',
    desc: 'A style of Japanese comic books and graphic novels.',
    colls: ['manga-agg', 'non-en-manga', 'manga-dl'],
  },
  {
    id: 'hentai',
    ico: '<img src="images/2Blove.png" alt="2Blove" style="width: 24px; height: 24px;">',
    name: 'Hentai',
    desc: 'A genre of Japanese manga and anime characterized by sexualized characters and explicit content.',
    colls: ['h-stream', 'doujinshi', 'h-dl'],
  },
  {
    id: 'novels',
    ico: '<img src="images/read_novel.png" alt="read_novel" style="width: 24px; height: 24px;">',
    name: 'Novels',
    desc: 'Visual novels (games) and light novels (books) as well as web novels (unrefined web posts).',
    colls: ['ln', 'wn', 'vn'],
  },
  {
    id: 'tools',
    ico: '<img src="images/PoliceArrest.png" alt="policearrest" style="width: 24px; height: 24px;">',
    name: 'Tools',
    desc: 'A service that protects your privacy online, plus image tools, trackers, and wallpaper boards.',
    colls: ['vpn', 'tracking', 'img-tools', 'wallpapers'],
  },
];


// ─── COLLECTIONS 
// Each entry shape:
//   n    — display name
//   u    — URL
//   note — short caveat (shown in italic yellow)
//   d    — description
//   s    — status: 'g' online | 'y' partial | 'r' down
//   t    — tags array

const COLLS = {

  // ── ANIME 

  'en-stream': {
    name: 'English Streaming Sites',
    ico: '<img src="images/anime/english-streaming-site.png" alt="ess" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Free and pirate anime streaming sites hosting or proxying streams in English sub/dub.',
    sites: [
      { n: 'Anime Nexus',  u: 'https://anime.nexus',    note: '',                                    d: 'Ad-free 1080p streaming with multi-language subs. Sync watchlist with AniList/MAL.',                                              s: 'g', t: ['Free', 'No Ads', '1080p'] },
      { n: 'AniGO',        u: 'https://anigo.to',        note: '',                                    d: 'Free anime. Fast servers. No ads. No account required — just visit and GO.',                                                       s: 'g', t: ['Free', 'No Ads'] },
      { n: 'AnimeKAI',     u: 'https://animekai.to',     note: '',                                    d: 'Biggest collection of anime. No ads. High quality. Subbed and dubbed.',                                                            s: 'g', t: ['Free', 'No Ads', 'Sub/Dub'] },
      { n: 'Anicrush',     u: 'https://anicrush.to',     note: '',                                    d: 'Large library, clean interface, sub and dub options. High quality.',                                                               s: 'g', t: ['Free', 'Sub/Dub'] },
      { n: 'HiAnime',      u: 'https://hianime.to',      note: 'Formerly Zoro / aniwatch.to',         d: 'Longstanding streaming platform. Reliable servers. Multi-language subtitles. Has ads.',                                           s: 'g', t: ['Free', 'Multi-lang', 'Ads'] },
      { n: 'AnimePahe',    u: 'https://animepahe.ru',    note: '"Okay-ish anime website" — their words', d: 'Lightweight player with reliable playback. Lots of ads on link shorteners, main site has no ads.',                            s: 'g', t: ['Free', 'Lightweight'] },
      { n: 'AnimeSuge',    u: 'https://animesuge.to',    note: '',                                    d: 'Free HD anime in sub or dub. Clean interface with search and filter.',                                                             s: 'g', t: ['Free', 'HD', 'Sub/Dub'] },
      { n: 'AnimeOwl',     u: 'https://animeowl-to.lol',   note: '',                                    d: 'Free anime streaming. Variety of shows and movies.',                                                                              s: 'g', t: ['Free'] },
      { n: 'Gojo',         u: 'https://gojo.to',         note: '',                                    d: 'Convenient free anime streaming. A search engine for anime and manga supporting many popular sites.',                              s: 'g', t: ['Free', 'Aggregator'] },
      { n: 'Shiroko',      u: 'https://shiroko.co',      note: '',                                    d: 'Watch anime online for free. Easy streaming interface.',                                                                           s: 'g', t: ['Free'] },
      { n: '9Anime',       u: 'https://9anime.to',       note: 'Many mirror domains exist',           d: 'Long-running free streaming site. Heavy ads. Large catalog.',                                                                      s: 'y', t: ['Free', 'Ads'] },
      { n: 'Marin',        u: 'https://marin.moe',       note: '',                                    d: 'Clean interface for free anime streaming.',                                                                                        s: 'g', t: ['Free'] },
    ],
  },

  'licensed': {
    name: 'Licensed Streaming',
    ico: '<img src="images/anime/english-streaming-site.png" alt="ess" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Legal, officially licensed anime streaming services.',
    sites: [
      { n: 'Crunchyroll',       u: 'https://crunchyroll.com',   note: 'Industry standard',            d: 'Largest legal anime library. Free tier with ads, Premium for 1080p ad-free.',                              s: 'g', t: ['Legal', 'Sub/Dub', 'Freemium'] },
      { n: 'Funimation',        u: 'https://funimation.com',    note: 'Merging into Crunchyroll',     d: 'Dub-focused legal service. Now under Sony/Crunchyroll umbrella.',                                           s: 'y', t: ['Legal', 'Dub'] },
      { n: 'HiDive',            u: 'https://hidive.com',        note: '',                             d: 'Legal streaming with niche, classic, and ecchi titles unavailable elsewhere. Subscription.',                s: 'g', t: ['Legal', 'Niche', 'Paid'] },
      { n: 'Netflix',           u: 'https://netflix.com',       note: 'Limited catalog, region-varies', d: 'All-in-one service with some exclusive anime titles. Content varies by region.',                          s: 'g', t: ['Legal', 'Regional'] },
      { n: 'Amazon Prime Video',u: 'https://primevideo.com',    note: '',                             d: 'Some exclusive licensed anime via Amazon Originals.',                                                         s: 'g', t: ['Legal', 'Exclusives'] },
      { n: 'Disney+',           u: 'https://disneyplus.com',    note: '',                             d: 'Carries some Star Wars and Marvel anime plus select licensed titles.',                                        s: 'g', t: ['Legal', 'Paid'] },
    ],
  },

  'self-hosted': {
    name: 'Self-Hosted & Scrapers',
    ico: '<img src="images/anime/self-hosted.gif" alt="selfhosted" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Apps and tools to self-host your media collection or scrape streams from other sources.',
    sites: [
      { n: 'Jellyfin', u: 'https://jellyfin.org',      note: 'Open source',  d: 'Free open source media server. Self-host your downloaded anime collection. No subscription.',    s: 'g', t: ['FOSS', 'Self-host'] },
      { n: 'Plex',     u: 'https://plex.tv',           note: '',             d: 'Feature-rich media server. Stream your local library on any device.',                              s: 'g', t: ['Self-host', 'Free tier'] },
      { n: 'Stremio',  u: 'https://stremio.com',       note: '',             d: 'Video aggregator with addon ecosystem. Add anime addons to stream from many sources.',             s: 'g', t: ['Addons', 'Aggregator'] },
      { n: 'Komga',    u: 'https://komga.org',          note: '',             d: 'Comics and manga server with a modern web reader. Self-hosted FOSS.',                             s: 'g', t: ['FOSS', 'Manga', 'Self-host'] },
      { n: 'Kavita',   u: 'https://kavitareader.com',  note: '',             d: 'Reading server for manga, comics, and ebooks. Self-hosted.',                                       s: 'g', t: ['FOSS', 'Self-host'] },
    ],
  },

  'foreign': {
    name: 'Foreign Streaming Sites',
    ico: '<img src="images/anime/foreign-streaming.png" alt="foreign streaming" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Non-English and region-specific anime streaming services.',
    sites: [
      { n: 'Anime-Sama',                    u: 'https://anime-sama.fr',               note: 'French',                     d: 'French anime, manga, and webtoons. Large French-language catalog.',                                         s: 'g', t: ['FR', 'Free'] },
      { n: 'ADN (Animation Digital Network)',u: 'https://animationdigitalnetwork.fr',  note: 'French IP required for some', d: 'Licensed French streaming. Need French IP for some content. Paid 1080p. Offers Blu-rays.',                s: 'y', t: ['FR', 'Legal', 'Paid'] },
      { n: 'Otakufr',                       u: 'https://otakufr.cc',                  note: 'French',                     d: 'French free anime streaming community.',                                                                     s: 'g', t: ['FR', 'Free'] },
      { n: 'AnimeFLV',                      u: 'https://www3.animeflv.net',           note: 'Spanish',                    d: 'One of the largest Spanish-language free anime streaming sites. Sub and Dub.',                              s: 'g', t: ['ES', 'Free'] },
      { n: 'Jkanime',                       u: 'https://jkanime.net',                 note: 'Spanish',                    d: 'Free Spanish anime streaming. Large catalog.',                                                               s: 'g', t: ['ES', 'Free'] },
      { n: 'AnimeSon',                      u: 'https://animeson.com',                note: 'Brazil / Portugal only',     d: 'Site can be accessed from Brazil and Portugal only.',                                                        s: 'y', t: ['PT', 'Regional'] },
      { n: 'Anime digital network (DE)',     u: 'https://anianiania.tv',               note: 'German',                     d: 'German-language anime content.',                                                                            s: 'g', t: ['DE', 'Free'] },
    ],
  },

  'android': {
    name: 'Android Apps',
    ico: '<img src="images/anime/android-app.gif" alt="android app" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Mobile applications for Android to watch anime or read manga without ads.',
    sites: [
      { n: 'Aniyomi',      u: 'https://aniyomi.org',                        note: 'Android 6.0+',        d: 'Unofficial fork of Tachiyomi adding anime capabilities. Extensible via community extension repos.',   s: 'g', t: ['FOSS', 'Anime+Manga'] },
      { n: 'Mihon',        u: 'https://mihon.app',                          note: 'Tachiyomi successor',  d: 'Free open source manga reader continuing the Tachiyomi project. Extension repos required.',            s: 'g', t: ['FOSS', 'Manga'] },
      { n: 'Awery',        u: 'https://github.com/itsmechinmoy/awery',      note: 'Dantotsu fork',        d: 'Feature-rich anime and manga reader. Aniyomi-compatible extensions.',                                 s: 'g', t: ['FOSS'] },
      { n: 'Dantotsu',     u: 'https://github.com/rebelonion/Dantotsu',    note: '',                     d: 'Anime and manga reader with AniList and MAL integration.',                                             s: 'g', t: ['FOSS'] },
      { n: 'AnymeX',       u: 'https://github.com/RyanYuuki/AnymeX',       note: 'Aniyomi-compatible',   d: 'Cross-platform anime app. Uses Aniyomi extensions.',                                                   s: 'g', t: ['FOSS', 'Cross-platform'] },
      { n: 'AniGO App',    u: 'https://anigo.to',                           note: '',                     d: 'Desktop application and lightweight Android app. Sources: Gogo, Kaido, AnimePahe, Animewave. Few sources have Dub.', s: 'g', t: ['Lightweight', 'Multi-source'] },
      { n: 'AnimeSlayer',  u: 'https://anifichier.com',                     note: '',                     d: 'Android app to watch anime on your phone without ads.',                                                s: 'g', t: ['No Ads', 'Free'] },
      { n: 'Miru (Android)',u: 'https://miru.watch',                        note: 'Open source',          d: 'Fast, simple anime torrent streaming app with a built-in list manager. Fully open source.',           s: 'g', t: ['FOSS', 'Torrent'] },
      { n: 'Hentoid',      u: 'https://github.com/avluis/Hentoid',         note: 'NSFW',                 d: 'Android hentai downloader with multiple source support. Free and open source.',                        s: 'g', t: ['NSFW', 'FOSS', 'Downloader'] },
    ],
  },

  'desktop': {
    name: 'Desktop Apps',
    ico: '<img src="images/anime/android-app.gif" alt="android app" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Desktop applications for downloading, streaming, and managing anime on PC.',
    sites: [
      { n: 'Miru',                    u: 'https://miru.watch',                            note: 'Windows / Mac / Linux', d: 'Fast, simple and easy to use anime torrent streaming app. Built-in list manager. Fully open source.',                          s: 'g', t: ['FOSS', 'Torrent', 'Cross-platform'] },
      { n: 'ani-cli',                 u: 'https://github.com/pystardust/ani-cli',         note: 'CLI',                   d: 'A highly efficient, fast, powerful and light-weight anime downloader and streamer from the command line.',                     s: 'g', t: ['CLI', 'FOSS'] },
      { n: 'animdl',                  u: 'https://github.com/justfoolingaround/animdl',   note: 'CLI',                   d: 'A simple but powerful anime downloader and streamer. Search and live stream anime/hentai torrents from the CLI.',             s: 'g', t: ['CLI', 'FOSS'] },
      { n: 'Hakuneko',                u: 'https://hakuneko.download',                     note: 'Windows / Mac / Linux', d: 'Free manga and anime downloader with multi-source support.',                                                                  s: 'g', t: ['FOSS', 'Downloader'] },
      { n: 'Free Manga Downloader 2', u: 'https://github.com/riderkick/FMD2',             note: 'Windows — GPLv2',       d: 'Free open source app for managing and downloading manga from various websites. GPLv2 license.',                              s: 'g', t: ['FOSS', 'Manga', 'Windows'] },
    ],
  },

  'torrents': {
    name: 'Torrents',
    ico: '<img src="images/anime/torrent.gif" alt="torrent" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Public and private trackers for the BitTorrent protocol. Anime, manga, games, and more.',
    sites: [
      { n: 'Nyaa.si',       u: 'https://nyaa.si',            note: 'Community standard',      d: 'The primary public tracker for anime torrents. Standard in the community.',                                                              s: 'g', t: ['Primary', 'Tracker'] },
      { n: 'Nyaa Pantsu',   u: 'https://nyaa.net',           note: 'NSFW section of Nyaa',    d: 'The NSFW/adult companion tracker to Nyaa.si.',                                                                                          s: 'g', t: ['NSFW', 'Tracker'] },
      { n: 'AnimeTosho',    u: 'https://animetosho.org',     note: '',                        d: 'Mirrors other public trackers. Get mediainfo, attachments, and subtitles from any torrent. All videos in .mkv format. Use Edge or Chrome.', s: 'g', t: ['Mirror', 'MKV', 'Subs'] },
      { n: 'AniDex',        u: 'https://anidex.info',        note: '',                        d: 'Anime-niche torrent tracker. Anime, manga, music, games, and more.',                                                                     s: 'g', t: ['Tracker', 'Multi-type'] },
      { n: 'SeaDex',        u: 'https://releases.moe',       note: 'Release comparison tool', d: 'Compares quality of different release groups automatically. Points to the best available version on Nyaa.',                              s: 'g', t: ['Quality guide', 'No torrents'] },
      { n: 'AcgnX',         u: 'https://share.acgnx.se',    note: 'Chinese community',       d: "Shows yesterday's and today's releases. Popular among the Chinese community.",                                                           s: 'g', t: ['CN', 'Tracker'] },
      { n: 'AniRena',       u: 'https://anirena.com',        note: 'Back online after hiatus',d: 'Classic anime torrent repository. Back online. Large archive including movies and TV.',                                                 s: 'y', t: ['Tracker', 'Classic'] },
      { n: 'SubsPlease',    u: 'https://subsplease.org',     note: 'XDCC via Rizon',          d: 'Uses XDCC on the Rizon IRC network. Primarily targets SubsPlease simulcast releases.',                                                  s: 'g', t: ['XDCC', 'Simulcast'] },
      { n: 'Shana Project', u: 'https://shanaproject.com',  note: '',                        d: 'Anime season tracker that aggregates torrent releases from common groups.',                                                               s: 'g', t: ['Aggregator', 'Seasonal'] },
    ],
  },


  // ── MANGA 

  'manga-agg': {
    name: 'Manga Aggregators',
    ico: '<img src="images/manga/manga-aggregrators.gif" alt="manga aggregators" style="width: 24px; height: 24px;">',
    lib: 'Manga',
    desc: 'Your go-to for manga. All the manga from the universe in just one website. How cool…',
    sites: [
      { n: 'MangaDex',    u: 'https://mangadex.org',                   note: 'Community standard',                       d: 'Community-driven. Many languages. Groups upload directly. No ads. Huge catalog.',                            s: 'g', t: ['Free', 'No Ads', 'Multi-lang', 'Community'] },
      { n: 'MangaPlus',   u: 'https://mangaplus.shueisha.co.jp',       note: 'Official Shueisha',                        d: 'Official free reader for Shonen Jump titles. First and last chapters free, rest paid.',                       s: 'g', t: ['Legal', 'Free', 'Official'] },
      { n: 'MangaFire',   u: 'https://mangafire.to',                   note: '',                                          d: 'Clean, fast reader with good catalog and regular updates.',                                                 s: 'g', t: ['Free', 'Fast'] },
      { n: 'Bato.to',     u: 'https://bato.to',                        note: 'Not the original — same owner as MangaPark', d: 'Large aggregator with community uploads. Wide catalog.',                                                  s: 'g', t: ['Free', 'Community'] },
      { n: 'MangaPark',   u: 'https://mangapark.net',                  note: '',                                          d: 'Large aggregator. Shows multiple source versions per title.',                                               s: 'g', t: ['Free', 'Multi-source'] },
      { n: 'MangaSee',    u: 'https://mangasee123.com',                note: '',                                          d: 'Licensed manga from official sources. Clean reader experience.',                                            s: 'g', t: ['Free', 'Licensed'] },
      { n: 'MangaKakalot',u: 'https://mangakakalot.com',               note: '',                                          d: 'Large catalog. Readable interface. Some ads.',                                                              s: 'g', t: ['Free', 'Ads'] },
      { n: 'ComicK',      u: 'https://comick.io',                      note: '',                                          d: 'Modern manga reader with tracking integration and chapter comments.',                                       s: 'g', t: ['Free', 'Tracking'] },
      { n: 'Cubari',      u: 'https://cubari.moe',                     note: '',                                          d: 'Easy to use web app to read manga and comics. Proxy reader for various sources including imgur albums.',    s: 'g', t: ['Free', 'Proxy'] },
      { n: 'MangaReader', u: 'https://mangareader.to',                 note: '',                                          d: 'Broad manga catalog with a clean modern reader.',                                                          s: 'g', t: ['Free'] },
      { n: 'Webtoon',     u: 'https://webtoon.com',                    note: 'Official platform',                        d: 'Webtoons and OEL comics. Official platform from Naver. Mix of free and daily pass chapters.',               s: 'g', t: ['Legal', 'Webtoon', 'Free'] },
      { n: 'Tapas',       u: 'https://tapas.io',                       note: '',                                          d: 'Webtoons and OEL comics. Mix of free and paid chapters.',                                                   s: 'g', t: ['Webtoon', 'Freemium'] },
      { n: 'MangaHub',    u: 'https://mangahub.io',                    note: '',                                          d: 'Manga reader with a large English-translated catalog.',                                                     s: 'g', t: ['Free', 'EN'] },
    ],
  },

  'non-en-manga': {
    name: 'Non-English Manga',
    ico: '<img src="images/manga/non-english-manga.png" alt="non enlish manga" style="width: 24px; height: 24px;">',
    lib: 'Manga',
    desc: 'Manga aggregator sites in languages other than English.',
    sites: [
      { n: 'LelManga',    u: 'https://lelmanga.com',       note: 'French',         d: 'French manga reader with good catalog.',                                             s: 'g', t: ['FR', 'Free'] },
      { n: 'Scan-VF',     u: 'https://scan-vf.net',        note: 'French',         d: 'French scan and scanlation reader.',                                                s: 'g', t: ['FR', 'Free'] },
      { n: 'MangaLivre',  u: 'https://mangalivre.net',     note: 'Portuguese (BR)',d: 'Large Brazilian Portuguese manga aggregator.',                                       s: 'g', t: ['PT-BR', 'Free'] },
      { n: 'LectorManga', u: 'https://lectormangaa.com',    note: 'Spanish',        d: 'Spanish manga reader with a large catalog.',                                        s: 'g', t: ['ES', 'Free'] },
      { n: 'NineManga',   u: 'https://es.ninemanga.com',   note: 'Multi-language', d: 'Multi-language manga site. Spanish, German, Italian and more.',                     s: 'g', t: ['Multi-lang'] },
      { n: 'MangaOwl',    u: 'https://mangaowl.io',       note: '',               d: 'Free manga reading with broad catalog in several languages.',                       s: 'g', t: ['Free', 'Multi-lang'] },
    ],
  },

  'manga-dl': {
    name: 'Manga Downloads',
    ico: '⬇<img src="images/manga/manga-downloads.png" alt="manga downloads" style="width: 24px; height: 24px;">',
    lib: 'Manga',
    desc: 'Direct download of manga in PDF, EPUB, and CBZ formats for offline reading.',
    sites: [
      { n: "Anna's Archive",  u: 'https://annas-archive.gl', note: 'Best option',                 d: 'Free access to millions of books, light novels, manga. Download via IPFS, DC++, or HTTP. Includes licensed and legal manga.', s: 'g', t: ['Free', 'PDF', 'EPUB', 'IPFS'] },
      { n: 'Z-Library',       u: 'https://z-lib.id',          note: 'Mirror domains change often', d: 'Free access to millions of books including light novels and manga.',                                                          s: 'g', t: ['Free', 'PDF', 'EPUB'] },
      { n: 'Library Genesis', u: 'https://libgen.im',          note: '',                            d: 'Classic academic and book repository. Good for manga volumes and art books.',                                                 s: 'g', t: ['Free', 'Classic'] },
    ],
  },


  // ── HENTAI 

  'h-stream': {
    name: 'Hentai Streaming',
    ico: '<img src="images/hentai/hentai-streaming.png" alt="hentai streaming" style="width: 24px; height: 24px;">',
    lib: 'Hentai',
    desc: 'Sites for streaming adult anime in 720p and 1080p. 18+ only.',
    sites: [
      { n: 'Hanime.tv',    u: 'https://hanime.tv',         note: '1080p behind premium',   d: 'The original hentai streaming platform. 1080p requires premium subscription.',                                               s: 'g', t: ['18+', 'Freemium', 'HD'] },
      { n: 'HentaiHaven',  u: 'https://hentaihaven.xxx',   note: '',                        d: 'Watch free hentai video online in 720p and 1080p. Regular updates with latest HD releases.',                                s: 'g', t: ['18+', 'Free', 'HD'] },
      { n: 'Oppai Stream', u: 'https://oppai.stream',      note: 'Includes Pornhwa',        d: 'Go through a large library of high resolution hentai without limits up to 4K. Hentai and Pornhwa.',                        s: 'g', t: ['18+', '4K', 'Free'] },
      { n: 'HentaiWorld',  u: 'https://hentaiworld.tv',    note: '',                        d: 'Free hentai streaming with regular update schedule.',                                                                        s: 'g', t: ['18+', 'Free'] },
    ],
  },

  'doujinshi': {
    name: 'Doujinshi Aggregators',
    ico: '<img src="images/hentai/doujinshi-aggregators.png" alt="doujinshi aggregators" style="width: 24px; height: 24px;">',
    lib: 'Hentai',
    desc: 'Your go-to for doujinshi. All the doujinshi from the universe in just one website.',
    sites: [
      { n: 'E-Hentai',              u: 'https://e-hentai.org',   note: '',                           d: 'Massive doujinshi and hentai manga gallery. Community-run. Free browsing, account for more.',                s: 'g', t: ['18+', 'Free', 'Gallery'] },
      { n: 'ExHentai (Sad Panda)',  u: 'https://exhentai.org',   note: 'Requires E-Hentai login',    d: 'Galleries from E-H removed due to licensing and copyright. Register on E-H first.',                           s: 'g', t: ['18+', 'Login required'] },
      { n: 'Nhentai',               u: 'https://nhentai.net',    note: '',                           d: 'Simple doujinshi reader. Clean tagging system. Very popular.',                                                 s: 'g', t: ['18+', 'Free', 'Simple'] },
      { n: 'Doujinzia',             u: 'https://doujinzia.com',  note: '',                           d: 'Streams tons of hentai manga and doujinshi online. Easy to find favorites.',                                   s: 'g', t: ['18+', 'Free'] },
      { n: 'Hitomi.la',             u: 'https://hitomi.la',      note: 'Requires login to download', d: 'Multi-language hentai and doujinshi. Requires login to download. Has torrents.',                              s: 'g', t: ['18+', 'Multi-lang'] },
      { n: 'Hentai2Read',           u: 'https://hentai2read.com',note: '',                           d: 'English-translated hentai manga reader.',                                                                      s: 'g', t: ['18+', 'EN', 'Free'] },
    ],
  },

  'h-dl': {
    name: 'Hentai Downloads',
    ico: '<img src="images/hentai/hentai-downloads.png" alt="hentai downloads" style="width: 24px; height: 24px;">',
    lib: 'Hentai',
    desc: 'Sites for downloading hentai games, CGs, and adult content.',
    sites: [
      { n: 'F95Zone',    u: 'https://f95zone.to',     note: 'Requires login to download. Has torrents.', d: 'Adult game community and download hub. Largest western adult game community.', s: 'g', t: ['18+', 'Games', 'Login'] },
      { n: 'Erogegames', u: 'https://erogegames.com', note: 'ALT: f95zone',                              d: 'Files offered in 200MB parts on the free download option.',                   s: 'g', t: ['18+', 'Games'] },
      { n: 'Fap Nation', u: 'https://fapnation.com',  note: '',                                          d: 'Adult game downloads and visual novels.',                                     s: 'g', t: ['18+', 'Games'] },
    ],
  },


  // ── NOVELS 

  'ln': {
    name: 'Light Novels',
    ico: '<img src="images/novel/light-novel.png" alt="light novel" style="width: 24px; height: 24px;">',
    lib: 'Novels',
    desc: 'A light novel is a style of Japanese young adult novel primarily targeting high school and middle school students.',
    sites: [
      { n: "Anna's Archive", u: 'https://annas-archive.org',      note: 'Best option',     d: 'Free access to millions of books, light novels, and manga. Download in PDF/EPUB formats.',                              s: 'g', t: ['Free', 'PDF', 'EPUB'] },
      { n: 'Z-Library',      u: 'https://z-lib.id',               note: '',                d: 'Free access to millions of books including light novels and manga.',                                                      s: 'g', t: ['Free', 'PDF', 'EPUB'] },
      { n: 'Novel Updates',  u: 'https://novelupdates.com',        note: '',                d: 'Track and discover fan-translated light novels and web novels. Includes MangaDex, official translations, and most popular groups.', s: 'g', t: ['Tracker', 'Fan TL', 'Community'] },
      { n: 'J-Novel Club',   u: 'https://j-novel.club',            note: 'Legal',           d: 'Official English translations of popular light novels. Subscription-based, early access model.',                         s: 'g', t: ['Legal', 'Official', 'Paid'] },
      { n: 'Yen Press',      u: 'https://yenpress.com',            note: 'Legal publisher', d: 'Official publisher for many popular light novel licenses in English.',                                                    s: 'g', t: ['Legal', 'Official'] },
      { n: 'LightNovelPub',  u: 'https://lightnovelpub.vip',       note: '',                d: 'Free light novel reader. Large catalog of machine and fan translations.',                                                s: 'g', t: ['Free'] },
      { n: 'NovelBin',       u: 'https://novelbin.com',            note: '',                d: 'Free light novel reader. Large catalog.',                                                                                 s: 'g', t: ['Free'] },
      { n: 'Lnreader',       u: 'https://github.com/LNReader/lnreader', note: 'Android app', d: 'An Android application for reading light novels. Open source.',                                                        s: 'g', t: ['FOSS', 'Android'] },
    ],
  },

  'wn': {
    name: 'Web Novels',
    ico: '<img src="images/novel/web-novels.png" alt="web novel" style="width: 24px; height: 24px;">',
    lib: 'Novels',
    desc: 'Web novels — original fiction posted online by authors directly, unrefined web posts.',
    sites: [
      { n: 'Royal Road',          u: 'https://royalroad.com',            note: 'Most recommended', d: 'Platform for original English web fiction. Primarily isekai, fantasy, LitRPG. Free.',                   s: 'g', t: ['Free', 'Original', 'EN'] },
      { n: 'ScribbleHub',         u: 'https://scribblehub.com',          note: '',                 d: 'Anime-influenced original web fiction community. Mostly isekai and fantasy.',                             s: 'g', t: ['Free', 'Original', 'EN'] },
      { n: 'Webnovel',            u: 'https://webnovel.com',             note: '',                 d: 'Chinese web novel platform. Mix of translated CN novels and originals. Coin/chapter system.',            s: 'g', t: ['CN', 'Freemium'] },
      { n: 'Wuxiaworld',          u: 'https://wuxiaworld.com',           note: '',                 d: 'Premium translations of Chinese xianxia and wuxia novels.',                                              s: 'g', t: ['CN', 'Legal', 'Freemium'] },
      { n: 'Novel Updates Forum', u: 'https://forum.novelupdates.com',   note: '',                 d: 'Community forum for novel translations, discussion, and group listings.',                                 s: 'g', t: ['Community', 'Forum'] },
    ],
  },

  'vn': {
    name: 'Visual Novels',
    ico: '<img src="images/novel/visual-novels.png" alt="visual novel" style="width: 24px; height: 24px;">',
    lib: 'Novels',
    desc: 'Visual novels (games) — interactive fiction combining text with graphics and player choices.',
    sites: [
      { n: 'VNDB',                u: 'https://vndb.org',             note: 'Database',                       d: 'The Visual Novel Database. Comprehensive index and community for all visual novels.',                          s: 'g', t: ['Database', 'Community'] },
      { n: 'Nyaa (Literature)',   u: 'https://nyaa.si/?c=3_0',       note: 'Nyaa literature category',       d: 'Nyaa.si literature section has a large visual novel torrent archive.',                                       s: 'g', t: ['Torrent', 'Archive'] },
      { n: 'F95Zone VN',          u: 'https://f95zone.to',           note: '',                               d: 'Large visual novel and adult game download community.',                                                       s: 'g', t: ['Games', 'Community', '18+'] },
      { n: 'CraneAnime Repacks',  u: 'https://craneapps.com',        note: '',                               d: 'Offers highly compressed repacks of games that are smaller-sized but may take several hours to install.',    s: 'g', t: ['Repacks', 'Compressed'] },
      { n: 'VN Drama CDs',        u: 'https://anime-sharing.com',    note: 'Requires donation for extra shows', d: 'Site for downloading manga drama CDs. Requires donation for access to extra shows.',                      s: 'y', t: ['Drama CDs', 'Donation'] },
      { n: 'Fuwanovel Archive',   u: 'https://fuwanovel.net',        note: 'Dump of old torrents',           d: 'Dump of torrents from the site Fuwanovel, which was shut down. Visual novel focused.',                      s: 'r', t: ['Archive', 'VN'] },
    ],
  },


  // ── TOOLS 

  'vpn': {
    name: 'VPN Services',
    ico: '<img src="images/tools/vpn-services.png" alt="vpn services" style="width: 24px; height: 24px;">',
    lib: 'Tools',
    desc: "VPNs that have been court-tested and proven to not retain logs. Your privacy is your responsibility.",
    sites: [
      { n: 'Mullvad',                       u: 'https://mullvad.net',                    note: 'Court-tested, accepts cash & crypto', d: 'VPN service that helps keep your online activity, identity, and location private.',                                         s: 'g', t: ['No-log', 'Court-tested', 'Privacy'] },
      { n: 'ProtonVPN',                     u: 'https://protonvpn.com',                  note: 'Swiss law — free tier',               d: 'The safest VPN for browsing privately. Developed by CERN scientists. Protected by Swiss privacy laws.',                     s: 'g', t: ['No-log', 'Free tier', 'Swiss'] },
      { n: 'AirVPN',                        u: 'https://airvpn.org',                     note: 'Activist-operated',                   d: 'An OpenVPN and WireGuard based VPN operated by activists in defense of net neutrality, privacy, and against censorship.',   s: 'g', t: ['No-log', 'Activist', 'Privacy'] },
      { n: 'PIA (Private Internet Access)', u: 'https://privateinternetaccess.com',      note: 'Court-tested',                        d: "PIA is the world's most trusted VPN provider. Privacy experts with a track record of putting privacy first.",                s: 'g', t: ['No-log', 'Court-tested'] },
      { n: 'NordVPN',                       u: 'https://nordvpn.com',                    note: '',                                    d: 'Leading VPN service that encrypts your internet traffic and hides your IP with physical location.',                           s: 'g', t: ['No-log', 'Popular'] },
      { n: 'Surfshark',                     u: 'https://surfshark.com',                  note: '',                                    d: 'Award-winning VPN. Unlimited simultaneous connections. Encrypts your online data.',                                          s: 'g', t: ['No-log', 'Unlimited devices'] },
      { n: 'Windscribe',                    u: 'https://windscribe.com',                 note: 'Free 10GB/month',                     d: 'Desktop application and browser extension that block ads and trackers, restore blocked content, and protect privacy.',       s: 'g', t: ['Free tier', 'Ad-block'] },
      { n: 'ExpressVPN',                    u: 'https://expressvpn.com',                 note: '',                                    d: 'Fast reliable VPN. TrustedServer technology — all data wiped on every reboot.',                                             s: 'g', t: ['No-log', 'Fast'] },
    ],
  },

  'tracking': {
    name: 'Tracking',
    ico: '<img src="images/tools/tracking.gif" alt="tracking" style="width: 24px; height: 24px;">',
    lib: 'Tools',
    desc: 'Track your anime, manga, and light novel consumption. Manage watchlists, reading lists, ratings, and stats.',
    sites: [
      { n: 'AniList',                 u: 'https://anilist.co',              note: 'Most recommended',       d: 'Modern anime and manga tracker with social features, stats, graphs, and seasonal charts. Very active community.',               s: 'g', t: ['Free', 'Social', 'API'] },
      { n: 'MyAnimeList (MAL)',        u: 'https://myanimelist.net',         note: '',                       d: 'The most popular tracking site. Largest community. Reviews, ratings, forums, and recommendations.',                           s: 'g', t: ['Free', 'Community', 'Popular'] },
      { n: 'Kitsu',                   u: 'https://kitsu.io',                note: '',                       d: 'Anime and manga tracker with a clean interface and social features.',                                                          s: 'g', t: ['Free', 'Social'] },
      { n: 'Anime-Planet',            u: 'https://anime-planet.com',        note: '',                       d: 'Track anime and manga. Includes recommendations and legal streaming integration.',                                             s: 'g', t: ['Free', 'Recommendations', 'Legal streaming'] },
      { n: 'Simkl',                   u: 'https://simkl.com',               note: '',                       d: 'Tracks anime, movies, and TV shows. Syncs with many services.',                                                              s: 'g', t: ['Free', 'Multi-media'] },
      { n: 'LiveChart',               u: 'https://livechart.me',            note: 'Best seasonal calendar', d: 'Seasonal anime airing schedules. Tracks all current-season shows with countdown timers.',                                    s: 'g', t: ['Free', 'Seasonal', 'Calendar'] },
      { n: 'This week on /r/anime',   u: 'https://reddit.com/r/anime',      note: 'Weekly poll tracker',    d: 'An automatically updating list of the most popular anime this week using votes from /r/anime.',                              s: 'g', t: ['Community', 'Reddit'] },
    ],
  },

  'img-tools': {
    name: 'Image Tools',
    ico: '<img src="images/tools/wallpapers.png" alt="image tools" style="width: 24px; height: 24px;">',
    lib: 'Tools',
    desc: 'Free tools for image compression, editing, upscaling, and OCR useful for manga and fanart workflows.',
    sites: [
      { n: 'Photopea',     u: 'https://photopea.com',                    note: '',                   d: 'Free online image editor. Photoshop-compatible. Best choice for temporary image editing.',                      s: 'g', t: ['Free', 'Editor'] },
      { n: 'waifu2x',      u: 'https://waifu2x.udp.jp',                 note: 'Classic',             d: 'Free anime image upscaling tool. The classic choice widely used by the community.',                             s: 'g', t: ['Free', 'Upscale', 'Anime'] },
      { n: 'Real-ESRGAN',  u: 'https://github.com/xinntao/Real-ESRGAN', note: 'Better than waifu2x', d: 'Free anime image upscaling tools. Better quality results than waifu2x.',                                       s: 'g', t: ['Free', 'FOSS', 'Upscale'] },
      { n: 'Squoosh',      u: 'https://squoosh.app',                     note: 'By Google',           d: 'Free image compression tool by Google. Runs in-browser. No upload limit.',                                    s: 'g', t: ['Free', 'Compression'] },
      { n: 'TinyPNG',      u: 'https://tinypng.com',                     note: '5MB file limit',      d: 'Free image compression. Images and PDFs must not be larger than 5MB.',                                        s: 'g', t: ['Free', 'Compression'] },
      { n: '2OCR',         u: 'https://2ocr.com',                        note: '',                   d: 'Online OCR service. Free to use. Image/PDF must not exceed 5MB.',                                               s: 'g', t: ['Free', 'OCR'] },
      { n: 'Birme',        u: 'https://birme.net',                       note: '',                   d: 'Batch image resizing tool. Free and runs fully in-browser.',                                                    s: 'g', t: ['Free', 'Batch resize'] },
    ],
  },

  'wallpapers': {
    name: 'Wallpapers',
    ico: '<img src="images/tools/wallpapers.png" alt="wallpapers" style="width: 24px; height: 24px;">',
    lib: 'Tools',
    desc: 'Anime and manga wallpaper boards, image boorus, and fanart repositories.',
    sites: [
      { n: 'Wallhaven',    u: 'https://wallhaven.cc',          note: '',                   d: 'Popular wallpaper sharing site. Nature, art, sci-fi, and anime. High resolution. Good search filters.',     s: 'g', t: ['Free', 'Multi-category', 'HD'] },
      { n: 'Konachan',     u: 'https://konachan.net',          note: '',                   d: 'Anime-focused wallpaper sharing site. Primarily widescreen desktop wallpapers.',                              s: 'g', t: ['Free', 'Anime', 'Widescreen'] },
      { n: 'Danbooru',     u: 'https://danbooru.donmai.us',    note: '',                   d: 'Large anime image board with extremely detailed tagging system.',                                              s: 'g', t: ['Free', 'Booru', 'Tagged'] },
      { n: 'Gelbooru',     u: 'https://gelbooru.com',          note: 'Has NSFW sections',  d: 'Anime image board. SFW and NSFW sections. Large catalog.',                                                   s: 'g', t: ['Free', 'Booru'] },
      { n: 'Zerochan',     u: 'https://zerochan.net',          note: '',                   d: 'Clean anime image board. Registration-free browsing.',                                                        s: 'g', t: ['Free', 'Clean'] },
      { n: 'Pixiv',        u: 'https://pixiv.net',             note: 'Japanese platform',  d: 'Japanese artist community and the primary source for official and fan anime art.',                            s: 'g', t: ['Free', 'Artists', 'JP'] },
      { n: 'SakugaBooru',  u: 'https://sakugabooru.com',       note: '',                   d: 'A booru focused on exceptional anime animation cuts (sakuga). Community-tagged.',                             s: 'g', t: ['Free', 'Sakuga', 'Animation'] },
    ],
  },

};
