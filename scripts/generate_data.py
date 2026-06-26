#!/usr/bin/env python3

import json, random

categories_data = [
    {
        "id": "anime",
        "name": "Anime",
        "description": "Websites and services for watching, downloading, and tracking anime.",
        "icon": "star",
        "subcategories": [
            {"id": "anime-stream", "name": "Streaming Sites"},
            {"id": "anime-scraper", "name": "Scrapers & Self-Hosted"},
            {"id": "anime-donghua", "name": "Donghua"},
            {"id": "anime-download", "name": "Downloads & Torrents"},
            {"id": "anime-ott", "name": "Legal OTT Services"},
            {"id": "anime-yt", "name": "YouTube Channels"},
        ]
    },
    {
        "id": "manga",
        "name": "Manga",
        "description": "Read, download, and purchase manga, manhwa, and manhua.",
        "icon": "bookmark",
        "subcategories": [
            {"id": "manga-online", "name": "Online Readers"},
            {"id": "manga-manhwa", "name": "Manhwa & Manhua"},
            {"id": "manga-download", "name": "Downloads"},
            {"id": "manga-legal", "name": "Legal Services"},
        ]
    },
    {
        "id": "novels",
        "name": "Novels",
        "description": "Light novels, web novels, and visual novels.",
        "icon": "bookmark",
        "subcategories": [
            {"id": "novel-online", "name": "Online Reading"},
            {"id": "novel-download", "name": "Downloads"},
            {"id": "novel-legal", "name": "Legal Services"},
        ]
    },
    {
        "id": "tokusatsu",
        "name": "Tokusatsu",
        "description": "Japanese live-action superhero shows like Kamen Rider, Ultraman, and Super Sentai.",
        "icon": "star",
        "subcategories": [
            {"id": "toku-stream", "name": "Streaming"},
            {"id": "toku-download", "name": "Downloads"},
            {"id": "toku-wiki", "name": "Wikis & Portals"},
        ]
    },
    {
        "id": "comics",
        "name": "Comics",
        "description": "Western comics, reading guides, and download sources.",
        "icon": "bookmark",
        "subcategories": [
            {"id": "comics-online", "name": "Online Reading"},
            {"id": "comics-download", "name": "Downloads"},
            {"id": "comics-guide", "name": "Reading Guides"},
            {"id": "comics-legal", "name": "Legal Services"},
        ]
    },
    {
        "id": "software",
        "name": "Software",
        "description": "Apps for watching anime, reading manga, and tracking your collection.",
        "icon": "grid3x3",
        "subcategories": [
            {"id": "soft-android", "name": "Android Apps"},
            {"id": "soft-ios", "name": "iOS Apps"},
            {"id": "soft-pc", "name": "PC Apps"},
            {"id": "soft-server", "name": "Server Software"},
            {"id": "soft-downloader", "name": "Downloaders"},
        ]
    },
    {
        "id": "music",
        "name": "Music",
        "description": "Stream, download, and discover Japanese music including anime songs, doujin, and vocaloid.",
        "icon": "heart",
        "subcategories": [
            {"id": "music-stream", "name": "Streaming"},
            {"id": "music-legal", "name": "Legal Services"},
            {"id": "music-download", "name": "Downloads"},
            {"id": "music-radio", "name": "Radio"},
            {"id": "music-phone", "name": "Phone Apps"},
            {"id": "music-pc", "name": "PC Software"},
        ]
    },
    {
        "id": "tools",
        "name": "Tools",
        "description": "Download managers, media players, image tools, and general utilities.",
        "icon": "search",
        "subcategories": [
            {"id": "tools-downloader", "name": "Download Managers"},
            {"id": "tools-media", "name": "Media Players"},
            {"id": "tools-image", "name": "Image Tools"},
            {"id": "tools-video", "name": "Video Tools"},
            {"id": "tools-arr", "name": "Arr Stack"},
            {"id": "tools-usenet", "name": "Usenet"},
            {"id": "tools-general", "name": "General Utilities"},
            {"id": "tools-ext", "name": "Browser Extensions"},
            {"id": "tools-scripts", "name": "Userscripts"},
        ]
    },
    {
        "id": "misc",
        "name": "Misc Sites",
        "description": "Databases, calendars, portals, utilities, and other resources.",
        "icon": "search",
        "subcategories": [
            {"id": "misc-database", "name": "Databases"},
            {"id": "misc-calendar", "name": "Calendars"},
            {"id": "misc-portal", "name": "Portals & News"},
            {"id": "misc-utility", "name": "Utilities"},
            {"id": "misc-4chan", "name": "4chan Archives"},
            {"id": "misc-encoding", "name": "Encoding & Fansubbing"},
            {"id": "misc-quiz", "name": "Quizzes & Games"},
        ]
    },
    {
        "id": "art",
        "name": "Art",
        "description": "Art platforms, boorus, official art archives, and commissioning.",
        "icon": "heart",
        "subcategories": [
            {"id": "art-platform", "name": "Platforms"},
            {"id": "art-booru", "name": "Boorus"},
            {"id": "art-frontend", "name": "Frontends"},
            {"id": "art-official", "name": "Official Art"},
            {"id": "art-commission", "name": "Commission & Support"},
            {"id": "art-software", "name": "Software"},
        ]
    },
    {
        "id": "games",
        "name": "Games",
        "description": "Game databases, tools, and community resources.",
        "icon": "grid3x3",
        "subcategories": [
            {"id": "games-database", "name": "Databases"},
            {"id": "games-tools", "name": "Tools"},
            {"id": "games-gacha", "name": "Gacha Games"},
            {"id": "games-osu", "name": "osu!"},
            {"id": "games-pokemon", "name": "Pokemon"},
            {"id": "games-sonic", "name": "Sonic"},
            {"id": "games-touhou", "name": "Touhou"},
            {"id": "games-yugioh", "name": "Yu-Gi-Oh!"},
        ]
    },
    {
        "id": "nsfw",
        "name": "NSFW",
        "description": "Adult anime, manga, illustrations, and related software.",
        "icon": "star",
        "subcategories": [
            {"id": "nsfw-anime", "name": "Anime"},
            {"id": "nsfw-manga", "name": "Manga & Doujinshi"},
            {"id": "nsfw-pornhwa", "name": "Pornhwa"},
            {"id": "nsfw-illust", "name": "Illustrations"},
            {"id": "nsfw-software", "name": "Software"},
            {"id": "nsfw-games", "name": "Games"},
            {"id": "nsfw-av", "name": "AV"},
        ]
    },
]

SITES = []

def site(name, url, cat, sub, desc="", tags=None, featured=False, status="online", added="2025-01-01", updated="2025-06-01"):
    sid = name.lower().replace(" ", "-").replace(".", "").replace(":", "").replace("'", "").replace("--", "-").strip("-")
    # Remove special chars
    sid = "".join(c for c in sid if c.isalnum() or c == "-")
    if not sid:
        sid = name.lower().replace(" ", "-")[:20]
    SITES.append({
        "id": sid,
        "name": name,
        "description": desc or f"{name} - a site in the {cat} category",
        "shortDescription": desc[:80] + "..." if len(desc) > 80 else (desc or name),
        "url": url,
        "category": cat,
        "subcategory": sub,
        "tags": tags or [],
        "featured": featured,
        "status": status,
        "language": "en",
        "requires": "",
        "curatorNote": "",
        "addedAt": added,
        "updatedAt": updated,
    })

# ===== ANIME =====

# Streaming
site("KickassAnime", "https://kaa.lt/", "anime", "anime-stream", "Popular anime streaming site with a large library and multiple quality options.", ["streaming","popular"], True)
site("Miruro", "https://www.miruro.to/", "anime", "anime-stream", "Modern anime streaming site with fast servers and multilingual subtitles.", ["streaming","scraper"], True)
site("AnimeStream", "https://anime.uniquestream.net/", "anime", "anime-stream", "Anime streaming site with a clean interface.", ["streaming"])
site("AnimeVerse", "https://animeverse.to/", "anime", "anime-stream", "Feature-rich anime streaming platform.", ["streaming"])
site("Re:ANIME", "https://reanime.to/home", "anime", "anime-stream", "Anime streaming site with simkl and mal tracking support.", ["streaming"], True)
site("AniZone", "https://anizone.to/", "anime", "anime-stream", "Anime streaming with a large library.", ["streaming"])
site("All Manga", "https://allmanga.to/anime", "anime", "anime-stream", "Multi-purpose anime and manga site.", ["streaming","manga"])
site("AnimePahe", "https://animepahe.pw/", "anime", "anime-stream", "Compressed anime streaming with multiple mirrors.", ["streaming","compressed"], True)
site("AniDB", "https://anidb.app/", "anime", "anime-stream", "Anime streaming app with a modern interface.", ["streaming","app"])
site("Animotvslash", "https://www.animotvslash.org/", "anime", "anime-stream", "Anime streaming site with dub and sub options.", ["streaming","dub"])
site("Watch Cartoon Online", "https://www.wco.tv/", "anime", "anime-stream", "Large library of cartoons and anime.", ["streaming","cartoon"])
site("Otaku-Streamers", "https://beta.otaku-streamers.com/", "anime", "anime-stream", "Anime streaming with an active community.", ["streaming","community"], "unknown")

# Scrapers
site("AniLight", "https://anilight.live/", "anime", "anime-scraper", "Multi-source anime scraper aggregating from popular sites.", ["scraper","aggregator"], True)
site("AnimeX", "https://animex.one/home", "anime", "anime-scraper", "Self-hosted anime scraper with multiple source support.", ["scraper","self-hosted"])
site("Luna", "https://luna-stream.me/", "anime", "anime-scraper", "Anime streaming scraper with multiple backends.", ["scraper","streaming"])

# Donghua
site("AnimeXin", "https://animexin.dev/", "anime", "anime-donghua", "Donghua (Chinese anime) streaming site.", ["donghua","chinese"])
site("Donghua Stream", "https://donghuastream.org/", "anime", "anime-donghua", "Streaming platform dedicated to donghua.", ["donghua","chinese"])
site("Crimson Subs", "https://crimsonfansubs.com/", "anime", "anime-donghua", "Fansub group specializing in donghua.", ["donghua","fansub"])

# Download
site("Nyaa", "https://nyaa.si/", "anime", "anime-download", "The premier BitTorrent site for anime and related media.", ["torrent","popular","tracker"], True)
site("AniRena", "https://www.anirena.com/", "anime", "anime-download", "Anime torrent tracker.", ["torrent","tracker"])
site("Tokyo Toshokan", "https://www.tokyotosho.info/", "anime", "anime-download", "Japanese media torrent tracker.", ["torrent","tracker"])
site("Shana Project", "https://www.shanaproject.com/", "anime", "anime-download", "Community-driven anime torrent site.", ["torrent","community"])
site("Tokyo Insider", "https://www.tokyoinsider.com/", "anime", "anime-download", "Direct download site for anime.", ["ddl","download"])
site("JPFiles", "https://jpfiles.net/", "anime", "anime-download", "Japanese file host for BDMV and raw anime.", ["bdmv","japanese","host"])

# OTT
site("Crunchyroll", "https://www.crunchyroll.com/", "anime", "anime-ott", "Leading legal anime streaming service with a huge library.", ["legal","ott","paid"], True)
site("HIDIVE", "https://www.hidive.com/", "anime", "anime-ott", "Legal anime streaming service with exclusive simulcasts.", ["legal","ott","paid"])
site("Netflix", "https://www.netflix.com/", "anime", "anime-ott", "Streaming giant with a growing anime catalog.", ["legal","ott","paid"])
site("RetroCrush", "https://www.retrocrush.tv/home", "anime", "anime-ott", "Free legal streaming of classic anime.", ["legal","ott","free","retro"])
site("OceanVeil", "https://oceanveil.net/", "anime", "anime-ott", "Legal anime streaming service.", ["legal","ott"])

# YT
site("Ani-One Asia", "https://www.youtube.com/@AniOneAsia", "anime", "anime-yt", "YouTube channel streaming anime legally in Asia.", ["youtube","legal"], True)
site("Muse Asia", "https://www.youtube.com/@MuseAsia", "anime", "anime-yt", "YouTube channel with legal anime simulcasts for Asia.", ["youtube","legal"])
site("Anime Bancho", "https://www.youtube.com/@AnimeBancho", "anime", "anime-yt", "YouTube channel with classic and cult anime.", ["youtube","retro"])

# Others
site("One Pace Project", "https://onepace.net/en/watch", "anime", "anime-download", "Fan project that recuts One Piece to match the manga pacing.", ["fan-project","one-piece"], True)

# ===== MANGA =====

site("Kagane", "https://kagane.to/", "manga", "manga-online", "Modern manga reader with multiple sources and reading modes.", ["reader","aggregator"], True)
site("Weeb Central", "https://weebcentral.com/", "manga", "manga-online", "Manga reader with a clean interface.", ["reader","aggregator"])
site("Atsumaru", "https://atsu.moe/", "manga", "manga-online", "Manga aggregator with tracking support.", ["reader","tracking"], True)
site("MangaFire", "https://mangafire.to/home", "manga", "manga-online", "Feature-rich manga reader with comments.", ["reader","aggregator"])
site("MangaKatana", "https://mangakatana.com/", "manga", "manga-online", "Simple manga reader with a large library.", ["reader"])
site("MangaBall", "https://mangaball.net/", "manga", "manga-online", "Manga aggregator with multiple sources.", ["reader","aggregator"])
site("Comix", "https://comix.to/", "manga", "manga-online", "Manga reader with a modern interface.", ["reader"])
site("Manga Fox", "https://mangafox.la/", "manga", "manga-online", "Long-running manga reader.", ["reader"])

# Manhwa
site("24hNovel", "https://24hnovel.com/", "manga", "manga-manhwa", "Manhwa and web novel reader.", ["manhwa","novel"])
site("King of Shojo", "https://kingofshojo.com/", "manga", "manga-manhwa", "Shojo and romance manhwa reader.", ["manhwa","shojo"])
site("ManhwaTOP", "https://manhwatop.com/", "manga", "manga-manhwa", "Manhwa aggregator with a large library.", ["manhwa","aggregator"])
site("ManhwaZone", "https://manhwazone.com/explore", "manga", "manga-manhwa", "Manhwa reading site.", ["manhwa"])
site("TopManhua", "https://manhuatop.org/", "manga", "manga-manhwa", "Manhua and manhwa aggregator.", ["manhua","manhwa"])

# Download
site("Madokami", "https://manga.madokami.al/", "manga", "manga-download", "Large manga archive with direct downloads.", ["archive","ddl"], True)
site("Anna's Archive", "https://annas-archive.gl/", "manga", "manga-download", "Massive open-source archive of books and manga.", ["archive","books","open-source"], True)
site("Library Genesis+", "https://libgen.li/", "manga", "manga-download", "Scientific and manga library.", ["archive","books"])
site("Internet Archive", "https://archive.org/", "manga", "manga-download", "Digital library with a massive manga collection.", ["archive","books"])
site("GetComics", "https://getcomics.org/", "manga", "manga-download", "Direct download site for comics and manga.", ["ddl","comics"])

# Legal
site("Manga Plus", "https://mangaplus.shueisha.co.jp/", "manga", "manga-legal", "Official Shueisha manga reader with free simulpub chapters.", ["legal","official","shueisha"], True)
site("Shonen Jump", "https://www.viz.com/sj-offer", "manga", "manga-legal", "VIZ Media's Shonen Jump subscription service.", ["legal","paid","viz"])
site("Viz", "https://www.viz.com/", "manga", "manga-legal", "VIZ Media official manga publisher store.", ["legal","paid","publisher"])
site("Yen Press", "https://yenpress.com/", "manga", "manga-legal", "English publisher of manga and light novels.", ["legal","paid","publisher"])
site("Kodansha USA", "https://kodansha.us/", "manga", "manga-legal", "Kodansha USA official manga publisher.", ["legal","paid","publisher"])
site("Manga Plus", "https://mangaplus.shueisha.co.jp/", "manga", "manga-legal", "Official Shueisha manga reader with free simulpub chapters.", ["legal","official","shueisha"])
site("BookWalker", "https://bookwalker.com/", "manga", "manga-legal", "Japanese ebook store for manga and light novels.", ["legal","paid","ebook"])
site("Lezhin", "https://www.lezhinus.com/en", "manga", "manga-legal", "Premium manhwa platform.", ["legal","paid","manhwa"])
site("Webtoon", "https://www.webtoons.com/en/", "manga", "manga-legal", "Free webcomic and webtoon platform.", ["legal","free","webtoon"], True)
site("Manta", "https://manta.net/en", "manga", "manga-legal", "Subscription-based manhwa platform.", ["legal","paid","manhwa"])

# ===== NOVELS =====

site("Novel Updates", "https://www.novelupdates.com/", "novels", "novel-online", "Directory and forum for translated light/web novels.", ["directory","tracker"], True)
site("Baka-tsuki", "https://www.baka-tsuki.org/project/", "novels", "novel-online", "Fan translation project for light novels.", ["fan-tl","community"])
site("Ranobes", "https://ranobes.top/", "novels", "novel-online", "Web novel reading site.", ["reader","web-novel"])
site("LNori", "https://lnori.com/", "novels", "novel-online", "Light novel reader with official translations.", ["reader","light-novel"])
site("Z-Library", "https://z-lib.sk/", "novels", "novel-download", "Massive ebook library.", ["archive","books","download"])
site("Elscione's Library", "https://server.elscione.com/", "novels", "novel-download", "Light novel direct download archive.", ["ddl","light-novel"])
site("J-Novel Club", "https://j-novel.club/", "novels", "novel-legal", "Legal light novel publisher and reading service.", ["legal","paid","publisher"], True)
site("Wuxia World", "https://www.wuxiaworld.com/", "novels", "novel-legal", "Web novel translation platform.", ["legal","web-novel","translation"])
site("Cross Infinite World", "https://www.crossinfworld.com/", "novels", "novel-legal", "Light novel publisher.", ["legal","publisher"])

# ===== TOKUSATSU =====

site("Toku555", "https://toku555.com/", "tokusatsu", "toku-stream", "Tokusatsu streaming site.", ["streaming","tokusatsu"])
site("Zokaj", "https://zokaj.com/", "tokusatsu", "toku-stream", "Tokusatsu and Asian drama streaming.", ["streaming","drama"])
site("KRDL", "https://krdl.moe/", "tokusatsu", "toku-download", "Tokusatsu direct download site.", ["ddl","tokusatsu"])
site("Tokupedia", "https://tokusatsu.fandom.com/wiki/Main_Page", "tokusatsu", "toku-wiki", "Fandom wiki for tokusatsu.", ["wiki","reference"])
site("Kamen Rider Wiki", "https://kamenrider.fandom.com/wiki/Kamen_Rider_Wiki", "tokusatsu", "toku-wiki", "Fandom wiki for Kamen Rider.", ["wiki","reference"])
site("Ultraman Wiki", "https://ultra.fandom.com/wiki/Ultraman_Wiki", "tokusatsu", "toku-wiki", "Fandom wiki for Ultraman.", ["wiki","reference"])
site("Tokunation", "https://news.tokunation.com/", "tokusatsu", "toku-wiki", "Tokusatsu news and community portal.", ["news","portal","community"])

# ===== COMICS =====

site("BatCave.biz", "https://batcave.biz/", "comics", "comics-online", "DC and Marvel comic reader.", ["reader","superhero"])
site("Read Comic Online", "https://readcomicsonline.ru/", "comics", "comics-online", "Large comic reading site.", ["reader","superhero"])
site("GetComics", "https://getcomics.org/", "comics", "comics-download", "Direct download site for comics.", ["ddl","download"], True)
site("Comic Book Herald", "https://www.comicbookherald.com/", "comics", "comics-guide", "Comic book reading guides and reviews.", ["guide","reference"])
site("DC Universe Infinite", "https://www.dcuniverseinfinite.com/", "comics", "comics-legal", "Official DC Comics subscription service.", ["legal","paid","dc"])
site("Marvel Unlimited", "https://www.marvel.com/unlimited", "comics", "comics-legal", "Official Marvel Comics subscription service.", ["legal","paid","marvel"])

# ===== SOFTWARE =====

# Android Anime
site("Cloudstream", "https://github.com/recloudstream/cloudstream", "software", "soft-android", "Android streaming app with plugin support for anime and movies.", ["android","streaming","open-source"], True)
site("Mihon", "https://mihon.app/", "software", "soft-android", "The premier manga reader for Android, successor to Tachiyomi.", ["android","reader","open-source","manga"], True)
site("Aniyomi", "https://github.com/jmir1/aniyomi", "software", "soft-android", "Android app for anime and manga with tracking support.", ["android","anime","manga","tracking"])
site("Dantotsu", "https://github.com/itsmechinmoy/dantotsu-updater", "software", "soft-android", "All-in-one anime, manga, and novel app for Android.", ["android","anime","manga","novel"])
site("Mangayomi", "https://github.com/kodjodevf/mangayomi", "software", "soft-android", "Cross-platform manga and anime app.", ["android","manga","anime","cross-platform"])

# iOS
site("Aidoku", "https://aidoku.app/", "software", "soft-ios", "Modern manga reader for iOS.", ["ios","manga","reader","open-source"])
site("Paperback", "https://paperback.moe/", "software", "soft-ios", "Manga reader for iOS with extension support.", ["ios","manga","reader"])
site("Sora", "https://github.com/cranci1/Sora", "software", "soft-ios", "Anime streaming app for iOS.", ["ios","anime","streaming"])

# PC
site("Stremio", "https://www.stremio.com/", "software", "soft-pc", "Cross-platform media center with addon support for anime and movies.", ["pc","media-center","addons"], True)
site("Seanime", "https://seanime.app/", "software", "soft-pc", "Modern anime desktop app with torrent streaming and tracking.", ["pc","anime","torrent","tracking"])
site("Hayase", "https://hayase.watch/", "software", "soft-pc", "Cross-platform anime app with torrent streaming.", ["pc","anime","torrent"])
site("qBittorrent", "https://www.qbittorrent.org/", "software", "soft-pc", "Open-source BitTorrent client.", ["pc","torrent","open-source","download"], True)
site("mpv", "https://mpv.io/", "software", "soft-pc", "Free, open-source media player.", ["pc","media-player","open-source"], True)
site("OpenComic", "https://opencomic.app/", "software", "soft-pc", "Modern comic and manga reader for PC.", ["pc","manga","reader"])
site("Calibre", "https://calibre-ebook.com/", "software", "soft-pc", "Powerful ebook management tool.", ["pc","ebook","management"])

# Server
site("Jellyfin", "https://jellyfin.org/", "software", "soft-server", "Free and open-source media server.", ["server","media","open-source"], True)
site("Plex", "https://www.plex.tv/your-media/", "software", "soft-server", "Popular media server platform.", ["server","media","paid"])
site("Komga", "https://komga.org/", "software", "soft-server", "Media server for comics and manga.", ["server","manga","comics"])
site("Kavita", "https://www.kavitareader.com/", "software", "soft-server", "Self-hosted manga and novel server.", ["server","manga","novel"])
site("Audiobookshelf", "https://www.audiobookshelf.org/", "software", "soft-server", "Self-hosted audiobook and podcast server.", ["server","audiobook"])

# Downloaders
site("yt-dlp", "https://github.com/yt-dlp/yt-dlp", "software", "soft-downloader", "Command-line video downloader, successor to youtube-dl.", ["downloader","video","cli","open-source"], True)
site("JDownloader", "https://jdownloader.org/", "software", "soft-downloader", "Cross-platform download manager with premium host support.", ["downloader","ddl","manager"])
site("Free Manga Downloader 2", "https://github.com/dazedcat19/FMD2", "software", "soft-downloader", "Bulk manga downloader.", ["downloader","manga","bulk"])
site("gallery-dl", "https://codeberg.org/mikf/gallery-dl/", "software", "soft-downloader", "Command-line gallery downloader for multiple sites.", ["downloader","gallery","cli"])

# ===== MUSIC =====

site("AnimeThemes", "https://animethemes.moe/", "music", "music-stream", "Database and streaming of anime opening and ending themes.", ["anime","opening","ending","database"], True)
site("Squidify", "https://www.squidify.org/", "music", "music-stream", "Free music streaming for anime and game OSTs.", ["streaming","anime","game","free"])
site("Doujin Style", "https://doujinstyle.com/", "music", "music-stream", "Doujin music streaming and downloads.", ["doujin","streaming","download"])
site("Nyaa", "https://nyaa.si/", "music", "music-download", "Torrent site with a huge anime/doujin music collection.", ["torrent","music","anime","doujin"], True)
site("Sitting on Clouds", "https://www.sittingonclouds.net/", "music", "music-download", "Anime and game OST direct download archive.", ["ddl","ost","anime","game"])
site("Lucida", "https://lucida.to/", "music", "music-download", "Multi-service music downloader.", ["downloader","multi-service"])
site("SauceNAO", "https://saucenao.com/", "music", "music-stream", "Image search engine that can identify anime, art, and sources.", ["search","image","anime","sauce"])

# Legal
site("Apple Music", "https://music.apple.com/", "music", "music-legal", "Apple's music streaming service with lossless audio.", ["legal","streaming","lossless","paid"])
site("Spotify", "https://spotify.com/", "music", "music-legal", "Popular music streaming platform.", ["legal","streaming","paid"])
site("Bandcamp", "https://bandcamp.com/", "music", "music-legal", "Platform for independent artists and doujin music.", ["legal","purchase","indie","doujin"])
site("Qobuz", "https://play.qobuz.com/", "music", "music-legal", "Hi-res music streaming and store.", ["legal","streaming","lossless","hi-res"])

# Radio
site("Nightwave Plaza", "https://plaza.one/", "music", "music-radio", "Vaporwave radio station.", ["radio","vaporwave"])
site("Listen.moe", "https://listen.moe/", "music", "music-radio", "Anime and Japanese music radio.", ["radio","japanese","anime"])
site("Gensokyo Radio", "https://gensokyoradio.net/", "music", "music-radio", "Touhou music radio station.", ["radio","touhou"])

# PC Music Software
site("Foobar2000", "https://www.foobar2000.org/", "music", "music-pc", "Advanced audio player for Windows.", ["player","audio","customizable"])
site("MusicBee", "https://www.getmusicbee.com/", "music", "music-pc", "Feature-rich music player for Windows.", ["player","audio","manager"])
site("Nicotine+", "https://nicotine-plus.org/", "music", "music-pc", "Soulseek music sharing client.", ["p2p","soulseek","download"])
site("MP3Tag", "https://www.mp3tag.de/en/", "music", "music-pc", "Powerful metadata tag editor.", ["tagger","metadata","audio"])
site("MusicBrainz Picard", "https://picard.musicbrainz.org/", "music", "music-pc", "Cross-platform music tagger using the MusicBrainz database.", ["tagger","metadata","database"])

# ===== TOOLS =====

site("Internet Download Manager", "https://www.internetdownloadmanager.com/", "tools", "tools-downloader", "Feature-rich download manager.", ["downloader","ddl","manager"])
site("JDownloader", "https://jdownloader.org/", "tools", "tools-downloader", "Cross-platform download manager with premium host support.", ["downloader","ddl","manager"])
site("Deluge", "https://www.deluge-torrent.org/", "tools", "tools-downloader", "Lightweight BitTorrent client.", ["torrent","client","open-source"])
site("Flud", "https://play.google.com/store/apps/details?id=com.delphicoder.flud", "tools", "tools-downloader", "Android torrent downloader.", ["android","torrent","downloader"])
site("Gopeed", "https://gopeed.com/", "tools", "tools-downloader", "Cross-platform download manager supporting HTTP and BitTorrent.", ["downloader","torrent","cross-platform"])

# Media Players
site("MPC-HC", "https://github.com/clsid2/mpc-hc", "tools", "tools-media", "Lightweight video player for Windows.", ["player","video","lightweight"])
site("SMPlayer", "https://www.smplayer.info/", "tools", "tools-media", "Cross-platform media player with codecs.", ["player","video","cross-platform"])
site("MPV", "https://mpv.io/", "tools", "tools-media", "Free, open-source media player with powerful scripting.", ["player","video","open-source","scriptable"], True)
site("IINA", "https://iina.io/", "tools", "tools-media", "Modern media player for macOS.", ["player","video","macos"])
site("IrfanView", "https://www.irfanview.com/", "tools", "tools-media", "Fast, compact image viewer for Windows.", ["viewer","image","lightweight"])
site("qView", "https://interversehq.com/qview/", "tools", "tools-media", "Minimal image viewer.", ["viewer","image","minimal"])

# Image Tools
site("ImageMagick", "https://imagemagick.org/index.php", "tools", "tools-image", "Powerful command-line image manipulation tool.", ["cli","image","converter","open-source"])
site("chaiNNer", "https://chainner.app/", "tools", "tools-image", "AI-powered image upscaling tool.", ["ai","upscale","image"])
site("ShareX", "https://getsharex.com/", "tools", "tools-general", "Screen capture and file sharing tool.", ["screenshot","capture","sharing","open-source"])

# Video Tools
site("FFmpeg", "https://ffmpeg.org/", "tools", "tools-video", "Complete cross-platform solution for video/audio processing.", ["cli","video","audio","converter"], True)
site("Aegisub", "https://github.com/arch1t3cht/Aegisub", "tools", "tools-video", "Advanced subtitle editor.", ["subtitle","editor","typesetting"])
site("MKVToolNix", "https://mkvtoolnix.download/", "tools", "tools-video", "Matroska (MKV) file manipulation tools.", ["mkv","tool","container"])
site("HandBrake", "https://handbrake.fr/", "tools", "tools-video", "Open-source video transcoder.", ["transcoder","video","converter","open-source"])
site("LosslessCut", "https://mifi.no/losslesscut/", "tools", "tools-video", "Cross-platform GUI for lossless video trimming.", ["trimmer","lossless","video"])

# Arr Stack
site("Sonarr", "https://sonarr.tv/", "tools", "tools-arr", "PVR for Usenet and BitTorrent users - automated series downloads.", ["automation","tv","pvr"], True)
site("Radarr", "https://radarr.video/", "tools", "tools-arr", "Movie collection manager for Usenet and BitTorrent.", ["automation","movie","pvr"])
site("Prowlarr", "https://prowlarr.com/", "tools", "tools-arr", "Indexer manager for the Arr stack.", ["automation","indexer","manager"])
site("Bazarr", "https://www.bazarr.media/", "tools", "tools-arr", "Subtitle management for Sonarr and Radarr.", ["automation","subtitle","manager"])

# General
site("Everything", "https://www.voidtools.com/", "tools", "tools-general", "Fast file search engine for Windows.", ["search","file","windows"])
site("Flow Launcher", "https://www.flowlauncher.com/", "tools", "tools-general", "Quick file search and app launcher.", ["launcher","search","productivity"])
site("Syncthing", "https://syncthing.net/", "tools", "tools-general", "Continuous file synchronization.", ["sync","file","open-source"])
site("Bulk Crap Uninstaller", "https://www.bcuninstaller.com/", "tools", "tools-general", "Bulk application uninstaller for Windows.", ["uninstaller","cleaner","windows"])
site("NanaZip", "https://github.com/M2Team/NanaZip", "tools", "tools-general", "File archiver for Windows.", ["archive","compression","windows"])

# Extensions
site("MAL-Sync", "https://malsync.moe/", "tools", "tools-ext", "Browser extension that syncs anime tracking across streaming sites.", ["tracking","anime","browser","sync"], True)
site("Violentmonkey", "https://violentmonkey.github.io/", "tools", "tools-ext", "Open-source userscript manager.", ["userscript","manager","browser"])
site("Buster", "https://github.com/dessant/buster", "tools", "tools-ext", "Captcha solver extension.", ["captcha","solver","browser"])
site("Indie Wiki Buddy", "https://getindie.wiki/", "tools", "tools-ext", "Redirects from Fandom to indie wikis.", ["wiki","redirect","browser"])
site("Search by Image", "https://github.com/dessant/search-by-image", "tools", "tools-ext", "Reverse image search extension.", ["image","search","reverse"])

# Scripts
site("Find on Nyaa", "https://greasyfork.org/en/scripts/379776-find-on-nyaa", "tools", "tools-scripts", "Userscript to find anime on Nyaa from any site.", ["userscript","nyaa","search"])
site("NyaaBlue", "https://releases.moe/about/", "tools", "tools-scripts", "Userscript that adds useful info to Nyaa pages.", ["userscript","nyaa","metadata"])

# ===== MISC =====

# Databases
site("AniList", "https://anilist.co/", "misc", "misc-database", "Modern anime and manga tracking database.", ["tracking","database","anime","manga","social"], True)
site("MyAnimeList", "https://myanimelist.net/", "misc", "misc-database", "The largest anime and manga database with community features.", ["tracking","database","anime","manga","community"], True)
site("AniDB", "https://anidb.net/", "misc", "misc-database", "Comprehensive anime database.", ["database","anime","info"])
site("SIMKL", "https://simkl.com/", "misc", "misc-database", "TV, anime, and movie tracking service.", ["tracking","tv","anime","movies"])
site("MangaUpdates", "https://www.mangaupdates.com/", "misc", "misc-database", "Manga release tracking and database.", ["tracking","manga","database"])
site("VNDB", "https://vndb.org/", "misc", "misc-database", "Visual novel database.", ["database","visual-novel","games"])
site("Anime News Network", "https://www.animenewsnetwork.com/", "misc", "misc-portal", "Anime news, reviews, and encyclopedia.", ["news","database","reviews"], True)
site("Wikipedia", "https://www.wikipedia.org/", "misc", "misc-database", "Free encyclopedia with extensive anime/manga articles.", ["encyclopedia","reference","free"])
site("Behind The Voice Actors", "https://www.behindthevoiceactors.com/", "misc", "misc-database", "Voice actor database for anime and games.", ["database","voice-actors","anime"])

# Calendars
site("AniChart", "https://anichart.net/airing", "misc", "misc-calendar", "Seasonal anime chart and airing schedule.", ["calendar","schedule","seasonal"], True)
site("Livechart", "https://www.livechart.me/schedule", "misc", "misc-calendar", "Anime release schedule.", ["calendar","schedule"])
site("AnimeSchedule", "https://animeschedule.net/", "misc", "misc-calendar", "Anime airing schedule.", ["calendar","schedule"])

# Portals
site("Crunchyroll News", "https://www.crunchyroll.com/news", "misc", "misc-portal", "Anime news from Crunchyroll.", ["news","anime"])
site("ORICON NEWS", "https://www.oricon.co.jp/", "misc", "misc-portal", "Japanese music and entertainment news.", ["news","japanese","music"])

# Utility
site("Seadex", "https://releases.moe/", "misc", "misc-utility", "Anime release database for fansub groups.", ["fansub","release","tracker"])
site("JustWatch", "https://www.justwatch.com/", "misc", "misc-utility", "Streaming availability search engine.", ["search","streaming","availability"])
site("Yatta-Tachi", "https://yattatachi.com/", "misc", "misc-utility", "Anime release news and legal streaming info.", ["news","release","legal"])

# ===== ART =====

site("Pixiv", "https://www.pixiv.net", "art", "art-platform", "Japan's largest art community platform.", ["art","community","illustration","japanese"], True)
site("Danbooru", "https://danbooru.donmai.us/", "art", "art-booru", "Popular image board with extensive tagging system.", ["booru","image","tagging"], True)
site("Gelbooru", "https://gelbooru.com/", "art", "art-booru", "Image board with a large anime-style art collection.", ["booru","image","tagging"])
site("Safebooru", "https://safebooru.org/", "art", "art-booru", "SFW image board with tagged anime art.", ["booru","image","sfw"])
site("Wallhaven", "https://wallhaven.cc/", "art", "art-platform", "High-quality wallpaper database.", ["wallpaper","image","curated"])
site("DeviantArt", "https://www.deviantart.com/", "art", "art-platform", "Largest online art community.", ["art","community","social"])
site("Sakuga Booru", "https://www.sakugabooru.com/", "art", "art-booru", "Animation sakuga clip database.", ["sakuga","animation","booru"])
site("Pixivision", "https://www.pixivision.net/en/", "art", "art-platform", "Pixiv's editorial feature for curated art collections.", ["art","editorial","curated"])

# Official Art
site("Big Book Covers", "https://covers.roler.dev/", "art", "art-official", "Large collection of manga book covers.", ["manga","covers","archive"])
site("MoviePosterDB", "https://www.movieposterdb.com/", "art", "art-official", "Movie poster database.", ["poster","movies","database"])

# Commission
site("Skeb", "https://skeb.jp/", "art", "art-commission", "Japanese commission platform.", ["commission","art","japanese"])
site("Ko-fi", "https://ko-fi.com/", "art", "art-commission", "Creator support and commission platform.", ["support","commission","donation"])
site("VGen", "https://vgen.co/", "art", "art-commission", "Art commission marketplace.", ["commission","art","platform"])
site("BOOTH", "https://booth.pm/en", "art", "art-platform", "Japanese creator marketplace.", ["marketplace","doujin","japanese"])

# Art Software
site("Imgbrd-Grabber", "https://www.bionus.org/imgbrd-grabber/", "art", "art-software", "Bulk image downloader for boorus.", ["downloader","booru","bulk"])
site("gallery-dl", "https://codeberg.org/mikf/gallery-dl/", "art", "art-software", "Command-line gallery downloader.", ["downloader","cli","gallery"])
site("Hydrus Network", "https://hydrusnetwork.github.io/hydrus/", "art", "art-software", "Personal image and metadata manager.", ["manager","metadata","image"])

# ===== GAMES =====

site("IGDB", "https://www.igdb.com/", "games", "games-database", "Internet Game Database.", ["database","games","reference"])
site("SteamDB", "https://steamdb.info/", "games", "games-database", "Steam database with game info and prices.", ["steam","database","prices"])
site("HowLongToBeat", "https://howlongtobeat.com/", "games", "games-database", "Game completion time database.", ["database","length","reference"])
site("GG.deals", "https://gg.deals/", "games", "games-tools", "Game price comparison across stores.", ["deals","prices","comparison"])
site("ProtonDB", "https://www.protondb.com/", "games", "games-database", "Steam Deck/Proton compatibility database.", ["linux","steam-deck","compatibility"])
site("Heroic Games Launcher", "https://heroicgameslauncher.com/", "games", "games-tools", "Open-source Epic/GOG launcher.", ["launcher","epic","gog","open-source"])
site("F95Zone", "https://f95zone.to/", "games", "games-tools", "Adult game community and discussion.", ["adult","games","community"])

# Osu
site("osu!", "https://osu.ppy.sh/", "games", "games-osu", "Free-to-win rhythm game.", ["rhythm","game","community"])
site("BeatConnect", "https://beatconnect.io/", "games", "games-osu", "osu! beatmap downloader.", ["osu","beatmap","downloader"])

# Pokemon
site("Pokemon Database", "https://pokemondb.net/", "games", "games-pokemon", "Pokemon stats, moves, and type database.", ["pokemon","database","reference"])
site("Serebii", "https://www.serebii.net/", "games", "games-pokemon", "Comprehensive Pokemon information site.", ["pokemon","database","news"])
site("Pokemon Showdown", "https://play.pokemonshowdown.com/", "games", "games-pokemon", "Online Pokemon battle simulator.", ["pokemon","battle","simulator"])
site("Pokemon Infinite Fusion", "https://infinitefusion.fandom.com/wiki/", "games", "games-pokemon", "Fan game where Pokemon can be fused.", ["pokemon","fan-game","fusion"])
site("Pokemon Revolution", "https://pokemonrevolution.net/home", "games", "games-pokemon", "MMO Pokemon fan game.", ["pokemon","mmo","fan-game"])

# Sonic
site("Sonic Retro", "https://info.sonicretro.org/", "games", "games-sonic", "Sonic the Hedgehog wiki and info.", ["sonic","wiki","database"])
site("Sonic Fan Games HQ", "https://sonicfangameshq.com/forums/", "games", "games-sonic", "Sonic fan game community.", ["sonic","fan-game","community"])

# Touhou
site("Touhou Wiki", "https://en.touhouwiki.net/wiki/Touhou_Wiki", "games", "games-touhou", "Touhou Project wiki and database.", ["touhou","wiki","database"])
site("Moriya Shrine", "https://moriyashrine.org/", "games", "games-touhou", "Touhou music and game downloads.", ["touhou","downloads","music"])
site("Touhou Puppet Play", "https://maribelhearn.com/touhoumon", "games", "games-touhou", "Touhou-themed Pokemon fan game.", ["touhou","fan-game","pokemon"])

# Yu-Gi-Oh
site("YGOPRODeck", "https://ygoprodeck.com/", "games", "games-yugioh", "Yu-Gi-Oh! card database and deck builder.", ["yugioh","cards","deck-builder"])
site("Yugipedia", "https://yugipedia.com/wiki/Yugipedia", "games", "games-yugioh", "Yu-Gi-Oh! wiki and card database.", ["yugioh","wiki","cards"])
site("Dueling Book", "https://www.duelingbook.com/", "games", "games-yugioh", "Online Yu-Gi-Oh! manual simulator.", ["yugioh","simulator","manual"])
site("EDO Pro", "https://projectignis.github.io/index.html", "games", "games-yugioh", "Automatic Yu-Gi-Oh! simulator.", ["yugioh","simulator","automatic"])

# ===== NSFW =====

site("E-Hentai", "https://e-hentai.org/", "nsfw", "nsfw-manga", "Massive doujinshi and manga archive.", ["doujinshi","archive","adult"], True)
site("nHentai", "https://nhentai.net/", "nsfw", "nsfw-manga", "Popular doujinshi reader.", ["doujinshi","reader","adult"], True)
site("Hitomi", "https://hitomi.la/", "nsfw", "nsfw-manga", "Doujinshi and gallery reader.", ["doujinshi","reader","gallery"])
site("Hanime", "https://hanime.tv/home", "nsfw", "nsfw-anime", "Adult anime streaming site.", ["hentai","streaming","adult"])
site("Danbooru", "https://danbooru.donmai.us/", "nsfw", "nsfw-illust", "Anime-style image board.", ["booru","image","tagging"])
site("Rule34video", "https://rule34video.com/", "nsfw", "nsfw-anime", "Adult video site.", ["video","adult","hentai"])
site("F95Zone", "https://f95zone.to/", "nsfw", "nsfw-software", "Adult games community.", ["games","community","adult"])
site("DLsite", "https://www.dlsite.com/", "nsfw", "nsfw-games", "Japanese doujin and adult content store.", ["marketplace","doujin","adult","japanese"], True)

# ===== ADDITIONAL SITES FROM EVERYTHINGMOE =====

# --- ANIME STREAMING (from EM anime section) ---
site("Anikoto", "https://anikoto.com/", "anime", "anime-stream", "Anime streaming with a large library and fast servers.", ["streaming"])
site("MKissa", "https://allanime.to/", "anime", "anime-stream", "Multi-purpose anime and manga streaming site.", ["streaming","manga","scraper"])
site("Animetsu", "https://animetsu.to/", "anime", "anime-stream", "Anime streaming site with multilingual support.", ["streaming","multi"])
site("Senshi", "https://senshi.stream/", "anime", "anime-stream", "Modern anime streaming site.", ["streaming"])
site("Anime Nexus", "https://animenexus.to/", "anime", "anime-stream", "Anime streaming platform with a clean UI.", ["streaming"])
site("AniSnatch", "https://anisnatch.net/", "anime", "anime-stream", "Multi-source anime streaming aggregator.", ["streaming","aggregator","multi"])
site("Anify", "https://anify.to/", "anime", "anime-stream", "Anime streaming site with multiple sources.", ["streaming","aggregator"])
site("AnimeParadise", "https://animeparadise.live/", "anime", "anime-stream", "Anime streaming and community site.", ["streaming"])
site("2Dhive", "https://2dhive.com/", "anime", "anime-stream", "Anime streaming with a modern interface.", ["streaming"])
site("AniHQ", "https://anihq.stream/", "anime", "anime-stream", "Anime streaming site with HD quality.", ["streaming","hd"])
site("AnimeHeaven", "https://animeheaven.me/", "anime", "anime-stream", "Classic anime streaming site with a large library.", ["streaming"])
site("Anikage", "https://anikage.to/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Just4Anime", "https://just4anime.com/", "anime", "anime-stream", "Anime streaming with subtitles in multiple languages.", ["streaming","multi"])
site("Lunar Animes", "https://lunaranime.com/", "anime", "anime-stream", "Anime streaming site with simulcast support.", ["streaming"])
site("AnimeGG", "https://animegg.org/", "anime", "anime-stream", "Simple anime streaming site.", ["streaming"])
site("Anime Hub", "https://animehub.to/", "anime", "anime-stream", "Anime streaming with dub and sub options.", ["streaming","dub"])
site("FireAnime", "https://fireanime.net/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("AnimeNoSub", "https://animenosub.to/", "anime", "anime-stream", "Anime streaming without subtitles.", ["streaming","raw"])
site("KimoiTV", "https://kimoitv.com/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("Animo", "https://animo.xyz/", "anime", "anime-stream", "Modern anime streaming platform.", ["streaming"])
site("1Anime", "https://1anime.pro/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Shiroko", "https://shiroko.co/", "anime", "anime-stream", "Multi-source anime streaming platform.", ["streaming","multi"])
site("Bettermelon", "https://bettermelon.org/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("Zenkai", "https://zenkai.live/", "anime", "anime-stream", "Modern anime streaming site with fast servers.", ["streaming"])
site("Fanime", "https://fanime.to/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("AnimeDex", "https://animedex.to/", "anime", "anime-stream", "Multi-source anime streaming aggregator.", ["streaming","multi","aggregator"])
site("Animeyubi", "https://animeyubi.com/", "anime", "anime-stream", "Anime streaming with multiple backends.", ["streaming","multi"])
site("YumeZone", "https://yumezone.com/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Itachi", "https://itachi.tv/", "anime", "anime-stream", "Multi-source anime streaming platform.", ["streaming","multi"])
site("JustAnime", "https://justanime.watch/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("AnimeKizz", "https://animekizz.com/", "anime", "anime-stream", "Multi-source anime streaming.", ["streaming","multi"])
site("Kyren", "https://kyren.io/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Animelok", "https://animelok.com/", "anime", "anime-stream", "Anime streaming aggregator.", ["streaming","aggregator"])
site("Anistream", "https://anistream.live/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("AniVibe", "https://anivibe.to/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("GogoAnime", "https://gogoanime.by/", "anime", "anime-stream", "Popular anime streaming site, GogoAnime mirror.", ["streaming","popular"])
site("Anime Libre", "https://animelibre.com/", "anime", "anime-stream", "Open-source anime streaming client.", ["streaming","open-source"])
site("Yomi", "https://yomi.to/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Kaori", "https://kaori.tv/", "anime", "anime-stream", "Multi-source anime streaming platform.", ["streaming","multi"])
site("Otakutsu", "https://otakutsu.com/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("PimpAnime", "https://pimpanime.com/", "anime", "anime-stream", "Multi-source anime streaming.", ["streaming","multi"])
site("NekoWatch", "https://nekowatch.com/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Animegers", "https://animegers.com/", "anime", "anime-stream", "Multi-source anime streaming.", ["streaming","multi"])
site("Kawaii Anime", "https://kawaiianime.cc/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("ani.pm", "https://ani.pm/", "anime", "anime-stream", "Multi-source anime streaming.", ["streaming","multi"])
site("StreamX", "https://streamx.cc/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("AniverseHD", "https://aniversehd.com/", "anime", "anime-stream", "Multi-source anime streaming in HD.", ["streaming","multi","hd"])
site("RamenFlix", "https://ramenflix.com/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Zanora", "https://zanora.tv/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("Animeya", "https://animeya.com/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("Enma", "https://enma.to/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("Anime Dunya", "https://animedunya.com/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("AnimeEpisodeSeries", "https://animeepisodeseries.com/", "anime", "anime-stream", "Anime episode listing and streaming.", ["streaming"])
site("Kayoanimetv", "https://kayoanimetv.com/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("AnimeWorld", "https://animeworld.in/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("AnimeDekho", "https://animedekho.com/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("Anikuro", "https://anikuro.com/", "anime", "anime-stream", "Multi-source anime streaming site.", ["streaming","multi"])
site("aniwaves", "https://aniwaves.ru/", "anime", "anime-stream", "Anime streaming site.", ["streaming"])
site("AV1 EnCodes", "https://av1please.com/", "anime", "anime-stream", "Anime streaming with AV1 encoding.", ["streaming","av1"])

# --- ANIME SCRAPER ---
site("Anidap", "https://anidap.com/", "anime", "anime-scraper", "Self-hosted anime scraper.", ["scraper","self-hosted"])
site("AniCore", "https://anicore.net/", "anime", "anime-scraper", "Multi-source anime scraper.", ["scraper","aggregator"])
site("Animelibre", "https://animelibre.vercel.app/", "anime", "anime-scraper", "Open-source anime streaming frontend.", ["scraper","open-source"])
site("Yomi Scraper", "https://yomi.to/", "anime", "anime-scraper", "Multi-source anime scraper frontend.", ["scraper","aggregator"])

# --- OTT / STREAMING SERVICES ---
site("Bilibili", "https://www.bilibili.com/", "anime", "anime-ott", "Chinese video sharing platform with licensed anime.", ["legal","ott","anime","chinese"], True)
site("Hulu", "https://www.hulu.com/", "anime", "anime-ott", "Streaming service with a selection of anime.", ["legal","ott","paid"])
site("YouTube", "https://www.youtube.com/", "anime", "anime-ott", "Video platform with official anime channels and content.", ["legal","ott","free","video"])

# --- ANIME DOWNLOAD ---
site("SubsPlease", "https://subsplease.org/", "anime", "anime-download", "Anime torrent and XDCC download site.", ["torrent","xdcc","fansub"], True)
site("AnimeTosho", "https://animetosho.org/", "anime", "anime-download", "Anime torrent, DDL, and Usenet download mirror.", ["torrent","ddl","usenet"])
site("SeaDex", "https://releases.moe/", "anime", "anime-download", "Anime release database and torrent index.", ["torrent","release","indexer"])
site("AnimeOut", "https://www.animeout.com/", "anime", "anime-download", "Anime direct download site.", ["ddl","download"])
site("KayoAnime", "https://kayoanime.com/", "anime", "anime-download", "Anime direct download site.", ["ddl","download"])
site("Hi10Anime", "https://hi10anime.com/", "anime", "anime-download", "High-quality anime encodes.", ["ddl","encode","hd"])
site("AniDL", "https://anidl.org/", "anime", "anime-download", "Anime direct download site.", ["ddl","download"])
site("AnimeKaizoku", "https://animekaizoku.com/", "anime", "anime-download", "Anime direct download site.", ["ddl","download"])
site("AnimeRss", "https://animerss.com/", "anime", "anime-download", "Anime raw downloads.", ["ddl","raw","download"])
site("Anime Time", "https://animetime.cc/", "anime", "anime-download", "Anime torrent and DDL site.", ["torrent","ddl"])

# --- DONGHUA ---
site("AnimeKhor", "https://animekhor.com/", "anime", "anime-donghua", "Donghua streaming site.", ["donghua","chinese"])
site("Myanime.live", "https://myanime.live/", "anime", "anime-donghua", "Donghua streaming platform.", ["donghua","chinese"])
site("LManime", "https://lmanime.com/", "anime", "anime-donghua", "Donghua streaming site.", ["donghua","chinese"])
site("Anime Cube", "https://animecube.tv/", "anime", "anime-donghua", "Donghua streaming.", ["donghua","chinese"])
site("Donghua.site", "https://donghua.site/", "anime", "anime-donghua", "Dedicated donghua streaming site.", ["donghua","chinese"])
site("NarulDonghua", "https://naruldonghua.com/", "anime", "anime-donghua", "Donghua streaming with a large library.", ["donghua","chinese"])
site("LuciferDonghua", "https://luciferdonghua.com/", "anime", "anime-donghua", "Donghua streaming site.", ["donghua","chinese"])
site("Anime4i", "https://anime4i.com/", "anime", "anime-donghua", "Anime and donghua streaming.", ["donghua","chinese","anime"])
site("ChikiAnimation", "https://chikianimation.com/", "anime", "anime-donghua", "Donghua streaming platform.", ["donghua","chinese"])
site("DonghuaWorld", "https://donghuaworld.com/", "anime", "anime-donghua", "Donghua streaming site.", ["donghua","chinese"])
site("HDonghua", "https://hdonghua.com/", "anime", "anime-donghua", "HD donghua streaming.", ["donghua","chinese","hd"])
site("MyDonghua", "https://mydonghua.com/", "anime", "anime-donghua", "Donghua streaming site.", ["donghua","chinese"])
site("Dongstream", "https://dongstream.net/", "anime", "anime-donghua", "Donghua streaming platform.", ["donghua","chinese"])
site("CKSub", "https://cksub.com/", "anime", "anime-donghua", "Donghua fansub group.", ["donghua","fansub","chinese"])
site("WowTopix", "https://wowtopix.com/", "anime", "anime-donghua", "Donghua streaming site.", ["donghua","chinese"])

# --- MANGA ONLINE (from EM manga section) ---
site("MangaDex", "https://mangadex.org/", "manga", "manga-online", "The largest free manga reading platform with community translations.", ["reader","community","open-source"], True)
site("Mangadotnet", "https://mangadotnet.com/", "manga", "manga-online", "Manga aggregator hub.", ["reader","aggregator","hub"])
site("OniSaga", "https://onisaga.com/", "manga", "manga-online", "Manga reader with a large library.", ["reader"])
site("Mangago", "https://mangago.me/", "manga", "manga-online", "Manga reading community platform.", ["reader","community"])
site("MangaTaro", "https://mangataro.com/", "manga", "manga-online", "Manga reader with multiple sources.", ["reader","aggregator"])
site("VyManga", "https://vymanga.com/", "manga", "manga-online", "Modern manga reader.", ["reader"])
site("MangaCloud", "https://mangacloud.com/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("MangaBuddy", "https://mangabuddy.com/", "manga", "manga-online", "Manga aggregator with a vast collection.", ["reader","aggregator"])
site("Cubari", "https://cubari.moe/", "manga", "manga-online", "Manga proxy and reader supporting multiple sources.", ["reader","proxy","aggregator"])
site("KaliScan", "https://kaliscan.com/", "manga", "manga-online", "Manga reader with scanlation aggregator.", ["reader","scanlation"])
site("MangaHub", "https://mangahub.io/", "manga", "manga-online", "Manga aggregator reader.", ["reader","aggregator"])
site("Scans.gg", "https://scans.gg/", "manga", "manga-online", "Scanlation hub and manga reader.", ["reader","scanlation","hub"])
site("Dynasty Reader", "https://dynasty-scans.com/", "manga", "manga-online", "Yuri and shoujo manga scanlation reader.", ["reader","scanlation","yuri"])
site("LikeManga", "https://likemanga.io/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("Manganato", "https://manganato.gg/", "manga", "manga-online", "Popular manga reader with Manganato family.", ["reader","popular"])
site("MangaFreak", "https://mfreak.me/", "manga", "manga-online", "Manga reading site with a large collection.", ["reader"])
site("MangaDE", "https://manga-de.com/", "manga", "manga-online", "Manga reader in German.", ["reader","german"])
site("MangaTown", "https://www.mangatown.com/", "manga", "manga-online", "Long-running manga reading site.", ["reader"])
site("MangaHome", "https://mangahome.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("Mangalink", "https://mangalink.xyz/", "manga", "manga-online", "Manga aggregator.", ["reader","aggregator"])
site("ReiManga", "https://reimanga.com/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("MangaBTT", "https://mangabtt.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("Mangapill", "https://mangapill.com/", "manga", "manga-online", "Manga reading site with official translations.", ["reader","official"])
site("Mangakawaii", "https://mangakawaii.io/", "manga", "manga-online", "Manga aggregator hub.", ["reader","aggregator","hub"])
site("ReadManga", "https://readmanga.cc/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("PAWMANGA", "https://pawmanga.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("Lilymanga", "https://lilymanga.com/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("Comicless", "https://comicless.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("MangaDoom", "https://mangadoom.com/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("MangaRead", "https://mangaread.org/", "manga", "manga-online", "Manga reader.", ["reader"])
site("Aqua Manga", "https://aquamanga.com/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("Todaymanga", "https://todaymanga.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("MangaPanda", "https://mangapanda.tv/", "manga", "manga-online", "Popular manga reader.", ["reader","popular"])
site("MangaBlaze", "https://mangablaze.com/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("CoffeManga", "https://coffeemanga.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("Mangasushi", "https://mangasushi.net/", "manga", "manga-online", "Manga reading site.", ["reader"])
site("MangaGecko", "https://mangagecko.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("Zinmanga", "https://zinmanga.com/", "manga", "manga-online", "Manga aggregator.", ["reader","aggregator"])
site("ComiKuro", "https://comikuro.com/", "manga", "manga-online", "Multi-source manga reader.", ["reader","multi"])
site("Ninekon", "https://ninekon.com/", "manga", "manga-online", "Manga reader.", ["reader"])
site("GodaComic", "https://godacomic.com/", "manga", "manga-online", "Manhua and manga reader.", ["reader","manhua"])

# --- MANGA MANHWA ---
site("Manhuascan", "https://manhuascan.com/", "manga", "manga-manhwa", "Manhua and manhwa reader.", ["manhua","manhwa","reader"])
site("ManhuaPlus", "https://manhuaplus.com/", "manga", "manga-manhwa", "Manhua dedicated reading site.", ["manhua","reader"])
site("ManhuaBuddy", "https://manhuabuddy.com/", "manga", "manga-manhwa", "Manhua and manhwa aggregator.", ["manhua","manhwa","aggregator"])
site("Manhua Hot", "https://manhuahot.com/", "manga", "manga-manhwa", "Manhua reading site.", ["manhua","reader"])
site("Manhuafast", "https://manhuafast.com/", "manga", "manga-manhwa", "Fast manhua and manhwa reader.", ["manhua","manhwa","reader"])
site("Manhwaz", "https://manhwaz.com/", "manga", "manga-manhwa", "Manhwa aggregator.", ["manhwa","aggregator"])
site("MangaGG", "https://mangagg.com/", "manga", "manga-manhwa", "Manhwa and manga reader.", ["manhwa","reader"])
site("Toonily", "https://toonily.com/", "manga", "manga-manhwa", "Manhwa reading site.", ["manhwa","reader"])
site("KuraManga", "https://kuramanga.com/", "manga", "manga-manhwa", "Manhwa reader.", ["manhwa","reader"])
site("Cocomic", "https://cocomic.com/", "manga", "manga-manhwa", "Manhwa and webtoon reader.", ["manhwa","webtoon"])
site("Mangazin", "https://mangazin.org/", "manga", "manga-manhwa", "Manhwa aggregator.", ["manhwa","aggregator"])
site("Galaxy Manga", "https://galaxymanga.com/", "manga", "manga-manhwa", "Manhwa and manga reader.", ["manhwa","reader"])
site("Manhwatoon", "https://manhwatoon.me/", "manga", "manga-manhwa", "Manhwa reading site.", ["manhwa","reader"])
site("Lua Comic", "https://luacomic.com/", "manga", "manga-manhwa", "Scanlation group reader.", ["manhwa","scanlation"])
site("Asura Scans", "https://asura.gg/", "manga", "manga-manhwa", "Popular scanlation group for manhwa.", ["manhwa","scanlation","popular"], True)
site("Flame Comics", "https://flamecomics.com/", "manga", "manga-manhwa", "Scanlation group reader.", ["manhwa","scanlation"])
site("Zero Scans", "https://zeroscans.com/", "manga", "manga-manhwa", "Scanlation group for manhwa.", ["manhwa","scanlation"])
site("Reset Scans", "https://resetscans.com/", "manga", "manga-manhwa", "Scanlation group reader.", ["manhwa","scanlation"])
site("Reaper Scans", "https://reaperscans.com/", "manga", "manga-manhwa", "Popular scanlation group.", ["manhwa","scanlation","popular"])
site("UTOON", "https://utoon.com/", "manga", "manga-manhwa", "Manhwa and manga reader.", ["manhwa","reader"])
site("Projectsuki", "https://projectsuki.com/", "manga", "manga-manhwa", "Manga and manhwa aggregator hub.", ["manhwa","manga","hub"])
site("Tapas", "https://tapas.io/", "manga", "manga-manhwa", "Webcomic and webtoon platform.", ["webtoon","legal","free"], True)
site("Toomics", "https://toomics.com/", "manga", "manga-manhwa", "Premium webtoon platform.", ["webtoon","legal","paid"])

# --- MANGA LEGAL ---
site("Coolmic", "https://coolmic.me/", "manga", "manga-legal", "Legal manga reading app.", ["legal","app","manga"])
site("INKR", "https://inkr.com/", "manga", "manga-legal", "Digital manga and webtoon platform.", ["legal","manga","webtoon","paid"])
site("MangaPlaza", "https://mangaplaza.com/", "manga", "manga-legal", "Legal manga store and reader.", ["legal","store","paid"])
site("Azuki", "https://azuki.co/", "manga", "manga-legal", "Digital manga subscription service.", ["legal","subscription","manga"])
site("MangaMirai", "https://mangamirai.com/", "manga", "manga-legal", "Manga publisher and reader.", ["legal","publisher","manga"])

# --- NOVELS ONLINE ---
site("NovelFire", "https://novelfire.com/", "novels", "novel-online", "Web novel reading platform.", ["reader","web-novel"])
site("LightNovelWorld", "https://lightnovelworld.org/", "novels", "novel-online", "Light novel reading site.", ["reader","light-novel"])
site("NovelArchive", "https://novelarchive.net/", "novels", "novel-online", "Light novel and web novel reader.", ["reader","light-novel","web-novel"])
site("NovelBuddy", "https://novelbuddy.com/", "novels", "novel-online", "Novel aggregator reader.", ["reader","aggregator"])
site("NovelDex", "https://noveldex.net/", "novels", "novel-online", "Light novel reader.", ["reader","light-novel"])
site("Wuxia Box", "https://wuxiabox.com/", "novels", "novel-online", "Wuxia and web novel reader.", ["reader","wuxia","web-novel"])
site("WuxiaClick", "https://wuxiaclick.com/", "novels", "novel-online", "Web novel reading site.", ["reader","web-novel"])
site("NovelsOnline", "https://novelsonline.net/", "novels", "novel-online", "Web novel aggregator.", ["reader","aggregator"])
site("Foxaholic", "https://foxaholic.com/", "novels", "novel-online", "Web novel reading site.", ["reader","web-novel"])
site("Chrysanthemum Garden", "https://chrysanthemumgarden.com/", "novels", "novel-online", "Danmei and BL novel translations.", ["reader","danmei","bl","translation"])
site("Royalroad", "https://www.royalroad.com/", "novels", "novel-online", "Web novel platform with original fiction.", ["reader","web-novel","original"], True)
site("ScribbleHub", "https://www.scribblehub.com/", "novels", "novel-online", "Web novel platform for original fiction.", ["reader","web-novel","original"])
site("NovelFull", "https://novelfull.com/", "novels", "novel-online", "Web novel aggregator.", ["reader","web-novel","aggregator"])
site("WoopRead", "https://woopread.com/", "novels", "novel-online", "Web novel reading platform.", ["reader","web-novel"])
site("WuxiaWorld Site", "https://wuxiaworld.site/", "novels", "novel-online", "Wuxia and web novel releases.", ["reader","wuxia","web-novel"])
site("Asianovel", "https://asianovel.net/", "novels", "novel-online", "Asian novel translations.", ["reader","translation","web-novel"])

# --- NOVELS DOWNLOAD ---
site("JustLightNovel", "https://justlightnovel.com/", "novels", "novel-download", "Light novel direct downloads.", ["ddl","light-novel"])
site("9Kafe", "https://9kafe.com/", "novels", "novel-download", "Light novel download site.", ["ddl","light-novel"])
site("Novelhi", "https://novelhi.com/", "novels", "novel-download", "Web novel reading platform.", ["reader","web-novel"])

# --- NOVELS LEGAL ---
site("Yen Press Novels", "https://yenpress.com/", "novels", "novel-legal", "Official light novel publisher.", ["legal","publisher","light-novel"])
site("Webnovel", "https://www.webnovel.com/", "novels", "novel-legal", "Web novel platform by Qidian.", ["legal","web-novel","paid"])

# --- TOKUSATSU / DRAMA STREAMING ---
site("Tokuzilla", "https://tokuzilla.net/", "tokusatsu", "toku-stream", "Tokusatsu streaming site.", ["streaming","tokusatsu"])
site("GoPlay", "https://goplay.su/", "tokusatsu", "toku-stream", "Asian drama and tokusatsu streaming.", ["streaming","drama","tokusatsu"])
site("Rakuten Viki", "https://www.viki.com/", "tokusatsu", "toku-stream", "Legal Asian drama streaming platform.", ["legal","ott","drama","paid"])
site("iQIYI", "https://www.iq.com/", "tokusatsu", "toku-stream", "Asian drama and variety streaming.", ["legal","ott","drama","chinese"])
site("WeTV", "https://wetv.vip/", "tokusatsu", "toku-stream", "Chinese drama streaming platform.", ["legal","ott","drama","chinese"])
site("Asianc TV", "https://asianc.tv/", "tokusatsu", "toku-stream", "Asian drama streaming site.", ["streaming","drama"])
site("Kdramaweb", "https://kdramaweb.net/", "tokusatsu", "toku-stream", "Korean drama streaming site.", ["streaming","drama","korean"])
site("Dramanicee", "https://dramanicee.cl/", "tokusatsu", "toku-stream", "Asian drama streaming.", ["streaming","drama"])
site("Lovo", "https://lovo.su/", "tokusatsu", "toku-stream", "Asian drama streaming site.", ["streaming","drama"])
site("Myasiantv", "https://myasiantv.cx/", "tokusatsu", "toku-stream", "Asian drama streaming platform.", ["streaming","drama"])
site("Asiaflix", "https://asiaflix.app/", "tokusatsu", "toku-stream", "Asian drama streaming.", ["streaming","drama"])
site("KissOppa", "https://kissoppa.com/", "tokusatsu", "toku-stream", "Korean drama streaming.", ["streaming","drama","korean"])
site("Kissasiantv", "https://kissasiantv.net/", "tokusatsu", "toku-stream", "Asian drama streaming site.", ["streaming","drama"])
site("OneTouchTV", "https://onetouchtv.com/", "tokusatsu", "toku-stream", "Live TV and drama streaming.", ["streaming","drama","live"])
site("AsianSubs", "https://asiansubs.net/", "tokusatsu", "toku-stream", "Asian drama with subtitles.", ["streaming","drama","subs"])

# --- DRAMA DOWNLOAD ---
site("OnlyKDrama", "https://onlykdrama.com/", "tokusatsu", "toku-download", "Korean drama direct downloads.", ["ddl","drama","korean"])
site("Dramaday", "https://dramaday.net/", "tokusatsu", "toku-download", "Asian drama direct downloads.", ["ddl","drama"])
site("MkvDrama", "https://mkvdrama.me/", "tokusatsu", "toku-download", "Asian drama MKV downloads.", ["ddl","drama","mkv"])

# --- WESTERN STREAMING (comics category) ---
site("Cineby", "https://cineby.app/", "comics", "comics-online", "Western streaming site for movies and TV.", ["western","streaming","movies"])
site("ShuttleTV", "https://shuttletv.app/", "comics", "comics-online", "Western streaming platform.", ["western","streaming","tv"])
site("HydraHD", "https://hydrahd.net/", "comics", "comics-online", "Western HD streaming site.", ["western","streaming","hd"])
site("NEPU Stream", "https://neputo.xyz/", "comics", "comics-online", "Western content streaming.", ["western","streaming","movies"])
site("M4uHD", "https://m4uhd.tv/", "comics", "comics-online", "Free movie and TV streaming.", ["western","streaming","free"])
site("Cinemaos", "https://cinemaos.win/", "comics", "comics-online", "Western streaming site.", ["western","streaming"])
site("Rive Stream", "https://rivestream.com/", "comics", "comics-online", "Western streaming platform.", ["western","streaming"])
site("Watchroo", "https://watchroo.com/", "comics", "comics-online", "Western movie and TV streaming.", ["western","streaming","movies"])
site("Vidbox", "https://vidbox.to/", "comics", "comics-online", "Western streaming site.", ["western","streaming"])
site("Hexa Watch", "https://hexawatch.com/", "comics", "comics-online", "Western streaming platform.", ["western","streaming"])

# --- SOFTWARE ANDROID ---
site("TachiyomiSY", "https://tachiyomi.org/", "software", "soft-android", "Manga reader fork of Tachiyomi.", ["android","reader","manga","open-source"])
site("Anikku", "https://anikku.app/", "software", "soft-android", "Anime streaming app for Android.", ["android","anime","streaming"])
site("Yokai", "https://yokai.app/", "software", "soft-android", "Manga reader app for Android.", ["android","manga","reader"])
site("AnymeX", "https://anymex.app/", "software", "soft-android", "Universal anime and manga app.", ["android","anime","manga","universal"])
site("LNReader", "https://lnreader.com/", "software", "soft-android", "Light novel reader for Android.", ["android","novel","reader","light-novel"])
site("QuickNovel", "https://quicknovel.app/", "software", "soft-android", "Light novel reader for Android.", ["android","novel","reader"])
site("Suwayomi", "https://tachidesk.app/", "software", "soft-android", "Server-based manga reader client.", ["android","manga","reader","server"])
site("Tsundoku", "https://tsundoku.app/", "software", "soft-android", "Manga and anime tracker app.", ["android","tracking","manga","anime"])
site("Shiru", "https://shiru.app/", "software", "soft-android", "Anime tracking app.", ["android","anime","tracking"])
site("Neko", "https://neko.manga.org/", "software", "soft-android", "MangaDex client for Android.", ["android","manga","reader","mangadex"])
site("Venera", "https://venera.app/", "software", "soft-android", "Universal anime and manga app.", ["android","anime","manga","universal"])
site("Dartotsu", "https://dartotsu.app/", "software", "soft-android", "All-in-one anime, manga, novel app.", ["android","anime","manga","novel","universal"])
site("TachiyomiJ2K", "https://tachiyomi.j2k.app/", "software", "soft-android", "Tachiyomi fork with enhanced UI.", ["android","manga","reader","fork"])
site("AniSurge", "https://anisurge.app/", "software", "soft-android", "Anime streaming app.", ["android","anime","streaming"])
site("Kitsune App", "https://kitsune.app/", "software", "soft-android", "Manga and anime tracking app.", ["android","tracking","manga","anime"])
site("Kaguya App", "https://kaguya.app/", "software", "soft-android", "Unified anime and manga app.", ["android","anime","manga","universal"])
site("AniLab", "https://anilab.to/", "software", "soft-android", "Anime and manga streaming app.", ["android","anime","manga","streaming"])
site("Saikou", "https://saikou.app/", "software", "soft-android", "All-in-one anime, manga and novel app.", ["android","anime","manga","novel","universal"])
site("Mangayomi Extensions", "https://mangayomi.github.io/", "software", "soft-android", "Cross-platform manga and anime reader.", ["android","manga","anime","cross-platform"])

# --- SOFTWARE iOS ---
site("Sora iOS", "https://sora-app.app/", "software", "soft-ios", "Anime streaming app for iOS.", ["ios","anime","streaming"])
site("Tachimanga", "https://tachimanga.app/", "software", "soft-ios", "Manga reader for iOS.", ["ios","manga","reader"])
site("Ketsu", "https://ketsu.app/", "software", "soft-ios", "Anime streaming app for iOS.", ["ios","anime","streaming"])
site("Suwatte", "https://suwatte.app/", "software", "soft-ios", "Manga reader for iOS.", ["ios","manga","reader"])
site("Mojuru", "https://mojuru.app/", "software", "soft-ios", "Anime tracker for iOS.", ["ios","anime","tracking"])
site("Awery", "https://awery.app/", "software", "soft-ios", "Anime tracking app for iOS.", ["ios","anime","tracking"])

# --- SOFTWARE PC ---
site("FMD2", "https://github.com/dazedcat19/FMD2", "software", "soft-pc", "Free Manga Downloader 2 for Windows.", ["pc","manga","downloader"])
site("Hakuneko", "https://hakuneko.app/", "software", "soft-pc", "Cross-platform manga and anime downloader.", ["pc","manga","anime","downloader"])
site("Houdoku", "https://houdoku.org/", "software", "soft-pc", "Manga reader for PC.", ["pc","manga","reader"])
site("Totoro", "https://totoro.app/", "software", "soft-pc", "Anime desktop app for PC.", ["pc","anime","streaming"])
site("Zenshin", "https://zenshin.app/", "software", "soft-pc", "Manga reader for desktop.", ["pc","manga","reader"])
site("Unyo", "https://unyo.app/", "software", "soft-pc", "Manga downloader for desktop.", ["pc","manga","downloader"])
site("Senpwai", "https://senpwai.app/", "software", "soft-pc", "Anime downloader for PC.", ["pc","anime","downloader"])
site("Teemii", "https://teemii.app/", "software", "soft-pc", "Manga reader for PC.", ["pc","manga","reader"])
site("Akuse", "https://akuse.app/", "software", "soft-pc", "Anime streaming desktop app.", ["pc","anime","streaming"])
site("Kotatsu Desktop", "https://kotatsu.app/", "software", "soft-pc", "Desktop companion for Kotatsu manga reader.", ["pc","manga","reader"])
site("Komikku Desktop", "https://komikku.app/", "software", "soft-pc", "Desktop manga reader.", ["pc","manga","reader"])
site("Azyx", "https://azyx.app/", "software", "soft-pc", "Universal anime and manga desktop app.", ["pc","anime","manga","universal"])

# --- SOFTWARE SERVER ---
site("Miru", "https://miru.js/", "software", "soft-server", "Self-hosted anime streaming server.", ["server","anime","self-hosted"])
site("Manatan", "https://manatan.app/", "software", "soft-server", "Self-hosted manga server.", ["server","manga","self-hosted"])
site("InkNest", "https://inknest.app/", "software", "soft-server", "Self-hosted manga reader server.", ["server","manga","reader"])
site("AniVu", "https://anivu.app/", "software", "soft-server", "Self-hosted anime streaming server.", ["server","anime","streaming"])

# --- SOFTWARE DOWNLOADERS ---
site("Lightnovel Crawler", "https://lightnovel-crawler.app/", "software", "soft-downloader", "Light novel downloader.", ["downloader","novel","light-novel"])
site("Novel DR", "https://noveldr.app/", "software", "soft-downloader", "Novel downloader app.", ["downloader","novel"])

# --- MUSIC ---
site("Karaoke Mugen", "https://karaokemugen.app/", "music", "music-stream", "Karaoke app with anime song database.", ["karaoke","anime","open-source"])
site("Anime Song Lyrics", "https://animesonglyrics.com/", "music", "music-stream", "Anime song lyrics database.", ["lyrics","anime","database"])
site("Lyrical Nonsense", "https://lyricalnonsense.com/", "music", "music-stream", "Anime and game lyrics database.", ["lyrics","anime","game"])
site("AnisongDB", "https://anisongdb.com/", "music", "music-stream", "Database of anime songs.", ["database","anime","songs"])
site("Anison Online", "https://anisononline.com/", "music", "music-stream", "Streaming anime openings and endings.", ["streaming","anime","op","ed"])
site("Openings.moe", "https://openings.moe/", "music", "music-stream", "Anime openings and endings streaming.", ["streaming","anime","op","ed"])
site("Musicdex", "https://musicdex.app/", "music", "music-stream", "Anime music database and streaming.", ["database","anime","music"])
site("AniPlaylist", "https://aniplaylist.com/", "music", "music-stream", "Anime music playlist database.", ["database","playlist","anime"])

# --- MUSIC DOWNLOAD ---
site("KHInsider", "https://downloads.khinsider.com/", "music", "music-download", "Video game music downloads.", ["ddl","game","ost"])
site("OkamimiOST", "https://okamimiost.com/", "music", "music-download", "Anime OST direct downloads.", ["ddl","ost","anime"])
site("Sonix OST", "https://sonix.gvn/", "music", "music-download", "Anime OST downloads.", ["ddl","ost","anime"])
site("Osanime", "https://osanime.com/", "music", "music-download", "Anime OST direct downloads.", ["ddl","ost","anime"])
site("SakuraOST", "https://sakuraost.com/", "music", "music-download", "Anime OST downloads.", ["ddl","ost","anime"])
site("JPopSingles", "https://jpopsingles.com/", "music", "music-download", "J-Pop music downloads.", ["ddl","jpop","music"])
site("MangaZip Music", "https://mangazip.com/music/", "music", "music-download", "Anime music direct downloads.", ["ddl","anime","music"])

# --- MUSIC RADIO ---
site("R/a/dio", "https://r-a-d.io/", "music", "music-radio", "Internet radio for anime and game music.", ["radio","anime","game"])
site("Yggdrasil Radio", "https://yggdrasilradio.com/", "music", "music-radio", "Anime and game music radio.", ["radio","anime","game"])
site("Radio Anime24", "https://radioanime24.com/", "music", "music-radio", "24/7 anime music radio.", ["radio","anime","24-7"])

# --- TOOLS (from EM tools section) ---
site("uBlock Origin", "https://ublockorigin.com/", "tools", "tools-ext", "Efficient wide-spectrum content blocker for browsers.", ["browser","adblock","privacy","open-source"], True)
site("VPN Service", "https://www.vpnservice.com/", "tools", "tools-general", "VPN recommendation and info for anime streaming.", ["vpn","privacy","streaming"])

# --- DATABASES (misc) ---
site("MangaBaka", "https://mangabaka.co/", "misc", "misc-database", "Manga tracking and database.", ["tracking","manga","database"])
site("ComicK Tracker", "https://comick.io/", "misc", "misc-database", "Manga tracker and database.", ["tracking","manga","reader"])
site("Kuroiru", "https://kuroiru.co/", "misc", "misc-database", "Anime and manga tracker.", ["tracking","anime","manga"])
site("MyFigureCollection", "https://myfigurecollection.net/", "misc", "misc-database", "Figure collecting database and community.", ["figures","collecting","database"])
site("VNDB", "https://vndb.org/", "misc", "misc-database", "Visual novel database.", ["visual-novel","database","games"])
site("VN Club", "https://vnclub.org/", "misc", "misc-database", "Visual novel database and tracker.", ["visual-novel","database","tracking"])
site("RanobeDB", "https://ranobedb.com/", "misc", "misc-database", "Light novel database.", ["light-novel","database","reference"])
site("VocaDB", "https://vocadb.net/", "misc", "misc-database", "Vocaloid music database.", ["vocaloid","database","music"])
site("VGMdb", "https://vgmdb.net/", "misc", "misc-database", "Video game music database.", ["game","music","database"])
site("Anison Charts", "https://anisoncharts.com/", "misc", "misc-database", "Anime music chart database.", ["anime","music","charts"])
site("MyWaifuList", "https://mywaifulist.com/", "misc", "misc-database", "Waifu character database.", ["anime","characters","database"])
site("Mudae", "https://mudae.com/", "misc", "misc-database", "Waifu character database.", ["characters","database","waifu"])
site("Konsumr", "https://konsumr.com/", "misc", "misc-database", "Media consumption tracker.", ["tracking","media","database"])
site("Kaguya Database", "https://kaguya.life/", "misc", "misc-database", "Visual novel tracker.", ["visual-novel","tracking","database"])
site("AnimeOshi", "https://animeoshi.com/", "misc", "misc-database", "Anime recommendation database.", ["anime","recommendation","database"])
site("Kurozora", "https://kurozora.app/", "misc", "misc-database", "Anime and manga tracker app.", ["tracking","anime","manga"])
site("AniSearch", "https://anisearch.com/", "misc", "misc-database", "Anime and manga search database.", ["anime","manga","search","database"])
site("Notify.moe", "https://notify.moe/", "misc", "misc-database", "Anime and manga notification tracker.", ["tracking","notifications","anime","manga"])
site("Anime Characters DB", "https://animecharactersdatabase.com/", "misc", "misc-database", "Anime character database.", ["characters","anime","database"])
site("Absolute Territory", "https://absoluteterritory.com/", "misc", "misc-database", "Anime database and tracker.", ["anime","database","tracking"])

# --- CALENDARS ---
site("Syoboi Calendar", "https://cal.syoboi.jp/", "misc", "misc-calendar", "Japanese anime airing schedule.", ["calendar","schedule","japanese"])
site("Upcoming Dubbed Anime", "https://upcomingdubanime.com/", "misc", "misc-calendar", "English dubbed anime release calendar.", ["calendar","dub","schedule"])
site("Dubs Release Calendar", "https://dubsreleasecalendar.com/", "misc", "misc-calendar", "English dub release schedule.", ["calendar","dub","schedule"])
site("Otaku Calendar", "https://otakucalendar.com/", "misc", "misc-calendar", "Anime, manga, and event calendar.", ["calendar","anime","manga","events"])
site("LNRelease", "https://lnrelease.com/", "misc", "misc-calendar", "Light novel release schedule.", ["calendar","light-novel","schedule"])
site("AnimeAiring", "https://animeairing.com/", "misc", "misc-calendar", "Anime airing schedule and countdown.", ["calendar","schedule"])
site("AnimeCountdown", "https://anicountdown.com/", "misc", "misc-calendar", "Anime countdown timer.", ["calendar","countdown"])
site("Senpai.moe", "https://senpai.moe/", "misc", "misc-calendar", "Anime release calendar and tracker.", ["calendar","tracking"])
site("anica.jp", "https://anica.jp/", "misc", "misc-calendar", "Japanese anime release calendar.", ["calendar","japanese","anime"])

# --- QUIZ ---
site("AnimeMusicQuiz", "https://animemusicquiz.com/", "misc", "misc-quiz", "Multiplayer anime music guessing game.", ["quiz","music","anime","multiplayer"])
site("AniGuessr", "https://aniguessr.com/", "misc", "misc-quiz", "Anime screenshot guessing game.", ["quiz","anime","screenshot"])
site("Chiaki Quiz", "https://chiakiquiz.com/", "misc", "misc-quiz", "Anime trivia quiz game.", ["quiz","anime","trivia"])
site("AniConnections", "https://aniconnections.com/", "misc", "misc-quiz", "Anime connection guessing game.", ["quiz","anime","connections"])
site("Baranimes", "https://baranimes.com/", "misc", "misc-quiz", "Anime music quiz game.", ["quiz","anime","music"])
site("ErogeMusicQuiz", "https://erogemusicquiz.com/", "misc", "misc-quiz", "Eroge music guessing game.", ["quiz","music","eroge"])
site("Guess The Opening", "https://guesstheopening.com/", "misc", "misc-quiz", "Anime opening theme guessing game.", ["quiz","anime","opening"])
site("Anime Opening Quiz", "https://animeopeningquiz.com/", "misc", "misc-quiz", "Anime opening identification quiz.", ["quiz","anime","opening"])
site("AnimeSongs.org", "https://animesongs.org/", "misc", "misc-quiz", "Anime song database and quiz.", ["quiz","anime","music","database"])
site("Animerdle", "https://animerdle.com/", "misc", "misc-quiz", "Daily anime wordle-style puzzle.", ["quiz","anime","daily","wordle"])
site("AnimeTrivia", "https://animetrivia.com/", "misc", "misc-quiz", "Anime trivia questions and answers.", ["quiz","anime","trivia"])
site("AnimeGuess", "https://animeguess.moe/", "misc", "misc-quiz", "Anime guessing game.", ["quiz","anime","guess"])

# --- FORUMS ---
site("Anime-Sharing", "https://anime-sharing.com/", "misc", "misc-portal", "Anime and hentai sharing forum.", ["forum","community","sharing"])
site("Fuwanovel", "https://forums.fuwanovel.net/", "misc", "misc-portal", "Visual novel and anime forum.", ["forum","visual-novel","community"])
site("AnimeForums", "https://animeforums.net/", "misc", "misc-portal", "General anime discussion forum.", ["forum","anime","community"])
site("Chuunime", "https://chuunime.com/", "misc", "misc-portal", "Anime discussion community.", ["forum","anime","community"])
site("Anime UK News", "https://animeuknews.net/", "misc", "misc-portal", "UK anime news and forums.", ["forum","news","uk","anime"])
site("MangaHelpers", "https://mangahelpers.com/", "misc", "misc-portal", "Manga discussion and scanlation forum.", ["forum","manga","community"])
site("AniSocial", "https://anisocial.app/", "misc", "misc-portal", "Anime social network and forums.", ["forum","social","anime"])

# --- AMV ---
site("AnimeMusicVideos.org", "https://www.animemusicvideos.org/", "misc", "misc-portal", "AMV database and community.", ["amv","community","database"])
site("AKROSS", "https://akross.ru/", "misc", "misc-portal", "Russian AMV contest and community.", ["amv","contest","community","russian"])
site("AMVnews", "https://amvnews.ru/", "misc", "misc-portal", "AMV release news and database.", ["amv","news","database"])
site("AMV Hell", "https://amvhell.com/", "misc", "misc-portal", "Community AMV compilation project.", ["amv","community","compilation"])
site("AnimeClips", "https://animeclips.online/", "misc", "misc-portal", "Anime clip and AMV sharing.", ["amv","clips","sharing"])

# --- GACHA GAMES ---
site("Prydwen.gg", "https://prydwen.gg/", "games", "games-gacha", "Gacha game tier lists and guides.", ["gacha","tier-list","guides","database"], True)
site("Game8", "https://game8.co/", "games", "games-gacha", "Japanese gacha game guides.", ["gacha","guides","japanese"])
site("Gacha Revenue", "https://gacharevenue.com/", "games", "games-gacha", "Gacha game revenue tracking.", ["gacha","revenue","tracking"])
site("SEELIE.me", "https://seelie.me/", "games", "games-gacha", "Genshin Impact helper tool.", ["gacha","genshin","tools"])
site("Wish Simulator", "https://wishsimulator.app/", "games", "games-gacha", "Gacha wish simulator.", ["gacha","simulator","game"])
site("WuWa Tracker", "https://wuwatracker.com/", "games", "games-gacha", "Wuthering Waves tracker and tools.", ["gacha","wuthering-waves","tracker"])
site("stardb.gg", "https://stardb.gg/", "games", "games-gacha", "Honkai Star Rail database.", ["gacha","honkai","database"])
site("Genshin.gg", "https://genshin.gg/", "games", "games-gacha", "Genshin Impact database and guides.", ["gacha","genshin","database","guides"])
site("encore.moe", "https://encore.moe/", "games", "games-gacha", "Gacha game tracker and database.", ["gacha","tracking","database"])
site("torikushiii", "https://torikushiii.com/", "games", "games-gacha", "Gacha game database and tools.", ["gacha","database","tools"])
site("gongeo.us", "https://gongeo.us/", "games", "games-gacha", "Gacha game resource site.", ["gacha","resources","tools"])
site("Twintail Launcher", "https://twintaillauncher.com/", "games", "games-gacha", "Multi-game gacha launcher.", ["gacha","launcher","multi-game"])
site("Collapse Launcher", "https://collapselauncher.com/", "games", "games-gacha", "Gacha game launcher.", ["gacha","launcher","game"])
site("Launcher.moe", "https://launcher.moe/", "games", "games-gacha", "Gacha game launcher.", ["gacha","launcher"])

# --- VTUBER (misc) ---
site("Holodex", "https://holodex.net/", "misc", "misc-utility", "VTuber multi-stream viewer and database.", ["vtuber","multiview","database"], True)
site("Amatsukaze", "https://amatsukaze.app/", "misc", "misc-utility", "VTuber clip viewer.", ["vtuber","clips","viewer"])
site("vTubie", "https://vtubie.com/", "misc", "misc-utility", "VTuber database and info.", ["vtuber","database","info"])
site("Hololist", "https://hololist.app/", "misc", "misc-utility", "Hololive schedule and info.", ["vtuber","hololive","schedule"])
site("Ragtag Archive", "https://ragtag.moe/", "misc", "misc-utility", "Indie VTuber clip archive.", ["vtuber","archive","clips"])
site("VTuber Tracker", "https://vtubertracker.com/", "misc", "misc-utility", "VTuber statistics and analytics.", ["vtuber","analytics","tracking"])
site("GoodVTuberSubs", "https://goodvtubersubs.com/", "misc", "misc-utility", "VTuber subtitled clips.", ["vtuber","subs","clips"])
site("VTuberSchedules", "https://vtuberschedules.com/", "misc", "misc-utility", "VTuber streaming schedules.", ["vtuber","schedule","streaming"])

# --- COSMPLAY (misc) ---
site("EZ Cosplay", "https://ezcosplay.com/", "misc", "misc-portal", "Cosplay costume store.", ["cosplay","store","costumes"])
site("MicCostumes", "https://miccostumes.com/", "misc", "misc-portal", "Cosplay and costume retailer.", ["cosplay","store"])
site("MoeFlavor", "https://moeflavor.com/", "misc", "misc-portal", "Cosplay costume shop.", ["cosplay","store"])
site("Uwowo Cosplay", "https://uwowocosplay.com/", "misc", "misc-portal", "Cosplay costume brand.", ["cosplay","brand","store"])
site("DokiDoki Cosplay", "https://dokidokicos.com/", "misc", "misc-portal", "Cosplay costume store.", ["cosplay","store"])
site("Pro Cosplay", "https://procosplay.com/", "misc", "misc-portal", "Cosplay costume retailer.", ["cosplay","store"])


# Remove duplicates (we had GetComics twice, etc.)
seen = set()
unique_sites = []
for s in SITES:
    key = s["id"]
    if key not in seen:
        seen.add(key)
        unique_sites.append(s)
    else:
        print(f"  Removed duplicate: {s['name']} ({s['id']})")

# Write categories
with open("public/data/categories.json", "w") as f:
    json.dump(categories_data, f, indent=2)
print(f"Wrote {len(categories_data)} categories to public/data/categories.json")

# Write sites
with open("public/data/sites.json", "w") as f:
    json.dump(unique_sites, f, indent=2)
print(f"Wrote {len(unique_sites)} sites to public/data/sites.json")
