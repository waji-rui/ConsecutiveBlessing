// worker.js - 前端化版本（移除了后端 DB / 登录逻辑）
// 仅作为 Cloudflare Worker 用来返回静态前端页面

const BLESSINGS = [
    "千门万户曈曈日，总把新桃换旧符。",
    "共欢新故岁，迎送一宵中。",
    "万物更新，旧疾当愈，长安常安。",
    "愿新年，胜旧年，多喜乐，长安宁。",
    "春风得意马蹄疾，一日看尽长安花。",
    "岁岁常欢愉，年年皆胜意。",
    "凡是过往，皆为序章。",
    "凛冬散尽，星河长明。",
    "且将新火试新茶，诗酒趁年华。",
    "大鹏一日同风起，扶摇直上九万里。",
    "愿你眼里有光，心中有爱，目光所及皆是星辰大海。",
    "行而不辍，未来可期。",
    "金龙摆尾辞旧岁，银蛇盘珠迎新春。",
    "所求皆如愿，所行化坦途。",
    "追风赶月莫停留，平芜尽处是春山。",
    "千门万户曈曈日，总把新桃换旧符。",
  "共欢新故岁，迎送一宵中。",
  "万物更新，旧疾当愈，长安常安。",
  "愿新年，胜旧年，多喜乐，长安宁。",
  "春风得意马蹄疾，一日看尽长安花。",
  "岁岁常欢愉，年年皆胜意。",
  "凡是过往，皆为序章。",
  "凛冬散尽，星河长明。",
  "且将新火试新茶，诗酒趁年华。",
  "大鹏一日同风起，扶摇直上九万里。",
  "愿你眼里有光，心中有爱，目光所及皆是星辰大海。",
  "行而不辍，未来可期。",
  "金龙摆尾辞旧岁，银蛇盘珠迎新春。",
  "所求皆如愿，所行化坦途。",
  "追风赶月莫停留，平芜尽处是春山。",
  "爆竹声中一岁除，春风送暖入屠苏。",
  "历添新岁月，春满旧山河。",
  "半盏屠苏犹未举，灯前小草写桃符。",
  "努力尽今夕，少年犹可夸。",
  "年年约，常相见。但无事，身强健。",
  "惟愿圣君无限寿，长取新年续旧年。",
  "愿除旧妄生新意，端与新年日日新。",
  "一日今年始，一年前事空。",
  "更祝明朝属日好，梅花满眼踏新年。",
  "乡心新岁切，天畔独潸然。",
  "旅馆谁相问？寒灯独可亲。一年将尽夜，万里未归人。",
  "小儿但喜新年至，头角长成添意气。",
  "宜入新年须吉利，明朝把笔写门楣。",
  "凯歌应是新年唱，便逐春风浩浩声。",
  "人歌小岁酒，花舞大唐春。愿得长如此，年年物候新。",
  "萧疏白发不盈颠，守岁围炉竟废眠。",
  "如花似叶，岁岁年年，共占春风。",
  "去岁千般皆如愿，今年万事定称心。",
  "从今诸事愿、胜如旧。人生强健，喜一年入手。",
  "纵有千古，横有八荒。前途似海，来日方长。",
  "天行健，君子以自强不息。",
  "天生我材必有用，千金散尽还复来。",
  "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",
  "志当存高远。",
  "丈夫志四海，万里犹比邻。",
  "不畏浮云遮望眼，自缘身在最高层。",
  "盛年不重来，一日难再晨。及时当勉励，岁月不待人。",
  "诗书勤乃有，不勤腹空虚。",
  "莫等闲，白了少年头，空悲切。",
  "路虽远，行则将至；事虽难，做则必成。",
  "我们都是追梦人，都是奋斗者。",
  "征途漫漫，惟有奋斗。",
  "幸福都是奋斗出来的。",
  "积土而为山，积水而为海。",
  "有付出，就会有收获。",
  "只要坚持，梦想总是可以实现的。",
  "成功的人们总是属于积极进取、不懈追求的人们。",
  "过往皆为序章，将来皆为可盼。",
  "烟火向星辰，所愿皆成真。",
  "旧岁千般皆如意，新年万事定称心。",
  "旧岁不悔，新年无畏，万事可期。",
  "家人闲坐，灯火可亲，新年伊始，喜乐安宁。",
  "新的一年，万事顺遂。",
  "愿你走完山水万程，仍与理想重逢。",
  "2026，目标：健康第一，快乐第二，赚钱第三！",
  "2026，春有花，秋有月，幸福永不缺！",
  "2026，在算法外，活出彩。既追光，也发光！",
  "2026，我敢想，我能行，我必赢！",
  "2026，低处修心，高处成事。心向光，自明亮！",
  "正是那些暗淡浑浊的过去，才成就了此刻闪闪发光的自己。",
  "若你决定灿烂，山无遮，海无拦。",
  "人生最重要的，是按照自己的意愿，活出自己喜欢的样子。",
  "路途曲折漫长，步步落子无悔。",
  "不是每一场雨后都有彩虹，但是晴天总会到来。",
  "愿日出所盼，日落所思，平平安安，所遇皆甜。",
  "归零，更新，重启，向上。2026，我们重新出发！",
  "旧岁已展千重锦，新年再进百尺竿。",
  "2026，一路向阳，一路生花。",
  "与2025轻道珍重，所有经历皆是成长的馈赠；向2026满怀憧憬，每段征程都藏着无限可能。",
  "2025过往不念，感恩所有相遇与陪伴；2026未来不惧，坚守初心奔赴热爱。前路漫漫亦灿灿，岁岁皆胜意。",
  "岁月因青春慨然以赴而更加静好，世间因少年挺身向前而更加瑰丽。",
  "生活不可能像你想象得那么好，但也不会像你想象得那么糟。",
  "那些杀不死你的，终将使你更强大。",
  "人生如逆旅，我亦是行人。",
  "不乱于心，不困于情。不畏将来，不念过往。如此，安好。",
  "艰难方显勇毅，磨砺始得玉成。",
  "艰难困苦，玉汝于成。",
  "九层之台，起于累土。",
  "咬定青山不放松，脚踏实地加油干。",
  "我们正在从事的事业是伟大的，坚忍不拔才能胜利，半途而废必将一事无成。",
  "天上不会掉馅饼，努力奋斗才能梦想成真。",
  "不驰于空想，不骛于虚声，一步一个脚印，踏踏实实干好工作。",
  "我们都在努力奔跑，我们都是追梦人。",
  "我们唯有砥砺奋进，笃行不怠，方能不负历史，不负时代，不负人民。",
  "往者不可谏，来者犹可追。",
  "志不立，天下无可成之事。",
  "日日新，又日新。",
  "新年莫多事，且放好怀开。",
  "从今把定春风笑，且作人间长寿仙。",
  "岁岁年年，共欢同乐，嘉庆与时新。",
  "一年三百六十日，愿长似今宵。",
  "椿萱并茂，棠棣同馨。",
  "辞暮尔尔，烟火年年。朝朝暮暮，岁岁平安。",
  "芳尊美酒，年年岁岁，月满高楼。",
  "山高有行路，水深有渡舟，和气作春妍，新年胜旧年。",
  "存远志，常读书，乐交友，惜四时。",
  "寒辞去冬雪，暖带入春风。阶馥舒梅素，盘花卷烛红。",
  "天增岁月人增寿，春满乾坤福满堂。",
  "You can cut all the flowers but you cannot keep spring from coming.",
  "The object of a New Year is not that we should have a new year. It is that we should have a new soul.",
  "Isn't it nice to think that tomorrow is a new day with no mistakes in it yet?",
  "The magic in new beginnings is truly the most powerful of them all.",
  "Celebrate endings, for they precede new beginnings.",
  "The beginning is the most important part of the work.",
  "Write it on your heart that every day is the best day in the year.",
  "It is never too late to be what you might have been.",
  "Your success and happiness lie in you. Resolve to keep happy, and your joy and you shall form an invincible host against difficulties.",
  "In the New Year, never forget to thank your past years, because they enabled you to reach today. Without the stairs of the past, you cannot arrive at the future!",
  "New Year’s Day: Now is the accepted time to make your regular annual good resolutions. Next week you can begin paving hell with them as usual.",
  "Approach the new year with resolve to find the opportunities hidden in each new day.",
  "The priceless lesson in the New Year is that endings birth beginnings and beginnings birth endings.",
  "爆竹声中一岁除，春风送暖入屠苏。",
  "千门万户曈曈日，总把新桃换旧符。",
  "共欢新故岁，迎送一宵中。",
    "愿得长如此，年年物候新。",
    "历添新岁月，春满旧山河。",
    "更祝明朝风日好，梅花满眼踏新年。",
    "辞暮尔尔，烟火年年，朝朝暮暮，岁岁平安。",
    "愿除旧妄生新意，端与新年日日新。",
    "如花似叶，岁岁年年，共占春风。",
    "大家沈醉对芳筵，愿新年，胜旧年。",
    "愿天上人间，占得欢娱，年年今夜。",
    "岁岁年年，共欢同乐，嘉庆与时新。",
    "东风夜放花千树，更吹落，星如雨。",
    "今年花胜去年红，可惜明年花更好。",
    "昨夜斗回北，今朝岁起东。",
    "一年将尽夜，万里未归人。",
    "愿新春以后，吉吉利利，百事都如意。",
    "日有熹，月有光，富且昌，寿而康。",
    "新春嘉平，长乐未央。",
    "从今诸事愿，胜如旧，人生强健。",
    "学而时习之，不亦说乎？——孔子",
    "三人行，必有我师焉。——孔子",
    "己所不欲，勿施于人。——孔子",
    "君子坦荡荡，小人长戚戚。——孔子",
    "知者不惑，仁者不忧，勇者不惧。——孔子",
    "天将降大任于斯人也，必先苦其心志。——孟子",
    "富贵不能淫，贫贱不能移，威武不能屈。——孟子",
    "生于忧患，死于安乐。——孟子",
    "老吾老以及人之老，幼吾幼以及人之幼。——孟子",
    "穷则独善其身，达则兼济天下。——孟子",
    "青，取之于蓝而青于蓝。——荀子",
    "锲而不舍，金石可镂。——荀子",
    "千里之行，始于足下。——老子",
    "知人者智，自知者明。——老子",
    "上善若水，水善利万物而不争。——老子",
    "天下难事必作于易，天下大事必作于细。——老子",
    "路漫漫其修远兮，吾将上下而求索。——屈原",
    "长太息以掩涕兮，哀民生之多艰。——屈原",
    "亦余心之所善兮，虽九死其犹未悔。——屈原",
    "静以修身，俭以养德。——诸葛亮",
    "非淡泊无以明志，非宁静无以致远。——诸葛亮",
    "鞠躬尽瘁，死而后已。——诸葛亮",
    "勿以恶小而为之，勿以善小而不为。——刘备",
    "恢弘志士之气，不宜妄自菲薄。——诸葛亮",
    "读书破万卷，下笔如有神。——杜甫",
    "文章千古事，得失寸心知。——杜甫",
    "会当凌绝顶，一览众山小。——杜甫",
    "笔落惊风雨，诗成泣鬼神。——杜甫",
    "业精于勤荒于嬉，行成于思毁于随。——韩愈",
    "书山有路勤为径，学海无涯苦作舟。——韩愈",
    "千里马常有，而伯乐不常有。——韩愈",
    "博观而约取，厚积而薄发。——苏轼",
    "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。——苏轼",
    "大江东去，浪淘尽，千古风流人物。——苏轼",
    "不识庐山真面目，只缘身在此山中。——苏轼",
    "苟日新，日日新，又日新。——《礼记》",
    "博学之，审问之，慎思之，明辨之，笃行之。——《礼记》",
    "玉不琢，不成器；人不学，不知道。——《礼记》",
    "天行健，君子以自强不息。——《周易》",
    "地势坤，君子以厚德载物。——《周易》",
    "满招损，谦受益。——《尚书》",
    "为山九仞，功亏一篑。——《尚书》",
    "工欲善其事，必先利其器。——《论语》",
    "己欲立而立人，己欲达而达人。——《论语》",
    "学而不思则罔，思而不学则殆。——《论语》",
    "知之为知之，不知为不知。——孔子",
    "士不可以不弘毅，任重而道远。——《论语》",
    "逝者如斯夫，不舍昼夜。——孔子",
    "见贤思齐焉，见不贤而内自省也。——孔子",
    "吾日三省吾身。——曾子",
    "穷且益坚，不坠青云之志。——王勃",
    "老当益壮，宁移白首之心。——王勃",
    "海内存知己，天涯若比邻。——王勃",
    "落霞与孤鹜齐飞，秋水共长天一色。——王勃",
    "先天下之忧而忧，后天下之乐而乐。——范仲淹",
    "不以物喜，不以己悲。——范仲淹",
    "醉翁之意不在酒，在乎山水之间也。——欧阳修",
    "忧劳可以兴国，逸豫可以亡身。——欧阳修",
    "千磨万击还坚劲，任尔东西南北风。——郑燮",
    "删繁就简三秋树，领异标新二月花。——郑燮",
    "纸上得来终觉浅，绝知此事要躬行。——陆游",
    "山重水复疑无路，柳暗花明又一村。——陆游",
    "位卑未敢忘忧国，事定犹须待阖棺。——陆游",
    "王师北定中原日，家祭无忘告乃翁。——陆游",
    "人生自古谁无死，留取丹心照汗青。——文天祥",
    "天下兴亡，匹夫有责。——顾炎武",
    "读万卷书，行万里路。——刘彝",
    "风声雨声读书声声声入耳，家事国事天下事事事关心。——顾宪成",
    "横眉冷对千夫指，俯首甘为孺子牛。——鲁迅",
    "时间就像海绵里的水，只要愿挤，总还是有的。——鲁迅",
    "其实地上本没有路，走的人多了，也便成了路。——鲁迅",
    "不在沉默中爆发，就在沉默中灭亡。——鲁迅",
    "寄意寒星荃不察，我以我血荐轩辕。——鲁迅",
    "为中华之崛起而读书。——周恩来",
    "面壁十年图破壁，难酬蹈海亦英雄。——周恩来",
    "一万年太久，只争朝夕。——毛泽东",
    "自信人生二百年，会当水击三千里。——毛泽东",
    "雄关漫道真如铁，而今迈步从头越。——毛泽东",
    "数风流人物，还看今朝。——毛泽东",
    "世上无难事，只要肯登攀。——毛泽东",
    "虚心使人进步，骄傲使人落后。——毛泽东",
    "一个人做点好事并不难，难的是一辈子做好事。——毛泽东",
    "知识就是力量。——培根（常用中译）",
    "天才就是百分之九十九的汗水加百分之一的灵感。——爱迪生（常用中译）",
    "书籍是人类进步的阶梯。——高尔基（常用中译）",
    "生命在于运动。——伏尔泰（常用中译）",
    "我思故我在。——笛卡尔（常用中译）",
    "走自己的路，让别人说去吧。——但丁（常用中译）",
    "知识改变命运。——培根（常用中译）",
    "不积跬步，无以至千里。——荀子",
    "锲而不舍，金石可镂。——荀子",
    "千里之行，始于足下。——老子",
    "The only thing we have to fear is fear itself.——Franklin D. Roosevelt",
    "I have a dream that one day...——Martin Luther King Jr.",
    "Ask not what your country can do for you...——John F. Kennedy",
    "Success is not final, failure is not fatal...——Winston Churchill",
    "The greatest glory in living lies not in never falling...——Nelson Mandela",
    "In the middle of difficulty lies opportunity.——Albert Einstein",
    "Imagination is more important than knowledge.——Albert Einstein",
    "Life is like riding a bicycle. To keep your balance you must keep moving.——Albert Einstein",
    "Genius is one percent inspiration and ninety-nine percent perspiration.——Thomas Edison",
    "I have not failed. I've just found 10,000 ways that won't work.——Thomas Edison",
    "The only way to do great work is to love what you do.——Steve Jobs",
    "Stay hungry, stay foolish.——Steve Jobs",
    "Think different.——Apple Inc.",
    "Just do it.——Nike",
    "Nothing is impossible.——Audrey Hepburn",
    "Believe you can and you're halfway there.——Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams.——Eleanor Roosevelt",
    "To be or not to be, that is the question.——Shakespeare",
    "All the world's a stage.——Shakespeare",
    "A rose by any other name would smell as sweet.——Shakespeare",
    "I came, I saw, I conquered.——Julius Caesar",
    "Carpe diem. Seize the day.——Horace",
    "Veni, vidi, vici.——Julius Caesar",
    "Eureka!——Archimedes",
    "I think, therefore I am.——René Descartes",
    "The unexamined life is not worth living.——Socrates",
    "Know thyself.——Socrates",
    "One step at a time.——Confucius（英译）",
    "A journey of a thousand miles begins with a single step.——Lao Tzu（英译）",
    "Be the change you wish to see in the world.——Mahatma Gandhi",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.——Mahatma Gandhi",
    "Happiness is when what you think, what you say, and what you do are in harmony.——Mahatma Gandhi",
    "First they ignore you, then they laugh at you, then they fight you, then you win.——Mahatma Gandhi",
    "Darkness cannot drive out darkness; only light can do that.——Martin Luther King Jr.",
    "I have decided to stick with love. Hate is too great a burden to bear.——Martin Luther King Jr.",
    "Free at last, free at last. Thank God Almighty, we are free at last.——Martin Luther King Jr.",
    "Yes we can.——Barack Obama",
    "Change will not come if we wait for some other person or some other time.——Barack Obama",
    "Hope is the thing with feathers that perches in the soul.——Emily Dickinson",
    "Because I could not stop for Death, He kindly stopped for me.——Emily Dickinson",
    "Tell me, what is it you plan to do with your one wild and precious life?——Mary Oliver",
    "The best way out is always through.——Robert Frost",
    "Two roads diverged in a wood, and I— I took the one less traveled by.——Robert Frost",
    "Do not go gentle into that good night.——Dylan Thomas",
    "I wandered lonely as a cloud.——William Wordsworth",
    "To err is human, to forgive divine.——Alexander Pope",
    "A little learning is a dangerous thing.——Alexander Pope",
    "O Captain! My Captain!——Walt Whitman",
    "I celebrate myself, and sing myself.——Walt Whitman",
    "Leave the door open for the unknown.——Rebecca Solnit",
    "The only impossible journey is the one you never begin.——Tony Robbins",
    "The way to get started is to quit talking and begin doing.——Walt Disney",
    "Your time is limited, don't waste it living someone else's life.——Steve Jobs",
    "Innovation distinguishes between a leader and a follower.——Steve Jobs",
    "Life is what happens when you're busy making other plans.——John Lennon",
    "Imagine all the people living life in peace.——John Lennon",
    "All you need is love.——John Lennon",
    "Yesterday is history, tomorrow is a mystery, today is a gift.——Eleanor Roosevelt",
    "No one can make you feel inferior without your consent.——Eleanor Roosevelt",
    "The purpose of life is to live it, to taste experience to the utmost.——Eleanor Roosevelt",
    "Do one thing every day that scares you.——Eleanor Roosevelt",
    "The hardest thing in this world is to live in it.——Buffy",
    "Every moment is a fresh beginning.——T.S. Eliot",
    "We shall not cease from exploration.——T.S. Eliot",
    "This is the way the world ends, not with a bang but a whimper.——T.S. Eliot",
    "April is the cruelest month.——T.S. Eliot",
    "I am the master of my fate, I am the captain of my soul.——William Ernest Henley",
    "Out of the night that covers me, Black as the pit from pole to pole.——William Ernest Henley",
    "Hope springs eternal in the human breast.——Alexander Pope",
    "To strive, to seek, to find, and not to yield.——Alfred Lord Tennyson",
    "'Tis better to have loved and lost than never to have loved at all.——Alfred Lord Tennyson",
    "The old order changeth, yielding place to new.——Alfred Lord Tennyson",
    "Knowledge is power.——Francis Bacon",
    "Some books are to be tasted, others to be swallowed.——Francis Bacon",
    "Reading maketh a full man.——Francis Bacon",
    "The world's mine oyster.——Shakespeare",
    "Brevity is the soul of wit.——Shakespeare",
    "Something is rotten in the state of Denmark.——Shakespeare",
    "All that glitters is not gold.——Shakespeare",
    "Neither a borrower nor a lender be.——Shakespeare",
    "To thine own self be true.——Shakespeare",
    "The play's the thing.——Shakespeare",
    "Once more unto the breach.——Shakespeare",
    "We few, we happy few, we band of brothers.——Shakespeare",
    "为中华之崛起而读书。——周恩来",
    "面壁十年图破壁，难酬蹈海亦英雄。——周恩来",
    "愿相会于中华腾飞世界时。——周恩来",
    "星星之火，可以燎原。——毛泽东",
    "不到长城非好汉。——毛泽东",
    "踏遍青山人未老，风景这边独好。——毛泽东",
    "中华儿女多奇志，不爱红装爱武装。——毛泽东",
    "可上九天揽月，可下五洋捉鳖。——毛泽东",
    "风雨送春归，飞雪迎春到。——毛泽东",
    "数风流人物，还看今朝。——毛泽东",
    "时间就是生命，时间就是速度，时间就是力量。——郭沫若",
    "读不在三更五鼓，功只怕一曝十寒。——郭沫若",
    "一万年太久，只争朝夕。——毛泽东",
    "世上无难事，只要肯登攀。——毛泽东",
    "虚心使人进步，骄傲使人落后。——毛泽东",
    "一个人做点好事并不难，难的是一辈子做好事。——毛泽东",
    "知识就是力量。——培根",
    "合理安排时间，就等于节约时间。——培根",
    "读书足以怡情，足以傅彩，足以长才。——培根",
    "真理是时间的女儿。——达·芬奇",
    "勤劳一日，可得一夜安眠；勤劳一生，可得幸福长眠。——达·芬奇",
    "意志若是屈从，不论程度如何，它都帮助了暴力。——但丁",
    "走自己的路，让别人去说吧。——但丁",
    "容易发怒，是品格上最为显著的弱点。——但丁",
    "道德常常能填补智慧的缺陷，而智慧却永远填补不了道德的缺陷。——但丁",
    "生命在于运动。——伏尔泰",
    "天分就是持续不断的忍耐。——伏尔泰",
    "读书使人心明眼亮。——伏尔泰",
    "我不同意你的观点，但我誓死捍卫你说话的权利。——伏尔泰",
    "要散布阳光到别人心里，先得自己心里有阳光。——罗曼·罗兰",
    "真正的英雄主义，是认清生活的真相后依然热爱生活。——罗曼·罗兰",
    "宿命论是那些缺乏意志力的弱者的借口。——罗曼·罗兰",
    "人生不售来回票，一旦动身，绝不能复返。——罗曼·罗兰",
    "世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的胸怀。——雨果",
    "人生下来不是为了拖着锁链，而是为了展开双翼。——雨果",
    "应该相信，自己是生活的强者。——雨果",
    "书是人类进步的阶梯。——高尔基",
    "天才出于勤奋。——高尔基",
    "世界上最快而又最慢，最长而又最短的就是时间。——高尔基",
    "我扑在书籍上，就像饥饿的人扑在面包上。——高尔基",
    "世界上最快乐的事，莫过于为理想而奋斗。——苏格拉底",
    "未经审视的人生不值得过。——苏格拉底",
    "认识自己，方能认识人生。——苏格拉底",
    "有理想在的地方，地狱就是天堂。——柏拉图",
    "人生最遗憾的，莫过于轻易地放弃了不该放弃的。——柏拉图",
    "耐心是一切聪明才智的基础。——柏拉图",
    "吾爱吾师，吾更爱真理。——亚里士多德",
    "求知是人类的本性。——亚里士多德",
    "幸福是把灵魂安放在最适当的位置。——亚里士多德",
    "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来。——奥斯特洛夫斯基",
    "人最宝贵的是生命，生命对于每个人只有一次。——奥斯特洛夫斯基",
    "钢是在烈火和急剧冷却里锻炼出来的。——奥斯特洛夫斯基",
    "应该让别人的生活因为有了你的生存而更加美好。——茨巴尔",
    "行而不辍，未来可期。",
    "追风赶月莫停留，平芜尽处是春山。",
    "纵有疾风起，人生不言弃。",
    "星光不负赶路人，时光不负有心人。",
    "流年笑掷，未来可期。",
    "以梦为马，不负韶华。",
    "凡是过往，皆为序章。",
    "凛冬散尽，星河长明。",
    "愿你眼有星辰大海，心有繁花似锦。",
    "愿你历尽千帆，归来仍是少年。",
    "愿你此生尽兴，赤诚善良。",
    "愿你所到之处，遍地阳光。",
    "愿你前程似锦，一路繁花相送。",
    "愿你以渺小启程，以伟大结束。",
    "愿你有诗有梦，有坦荡荡的远方。",
    "愿你一生努力，一生被爱。",
    "愿你三冬暖，愿你春不寒。",
    "愿你天黑有灯，下雨有伞。",
    "愿你善其身，愿你遇良人。",
    "愿你所求皆如愿，所行化坦途。",
    "万物更新，旧疾当愈，长安常安。",
    "愿新年，胜旧年，多喜乐，长安宁。",
    "岁岁常欢愉，年年皆胜意。",
    "朝朝暮暮，平平安安。",
    "烟火向星辰，所愿皆成真。",
    "凛冬散尽，星河长明。",
    "日有熹，月有光，富且昌，寿而康。",
    "新春嘉平，长乐未央。",
    "辞暮尔尔，烟火年年。",
    "共欢新故岁，迎送一宵中。",
    "历添新岁月，春满旧山河。",
    "更祝明朝风日好，梅花满眼踏新年。",
    "愿得长如此，年年物候新。",
    "愿除旧妄生新意，端与新年日日新。",
    "如花似叶，岁岁年年，共占春风。",
    "大家沈醉对芳筵，愿新年，胜旧年。",
    "愿天上人间，占得欢娱，年年今夜。",
    "岁岁年年，共欢同乐，嘉庆与时新。",
    "从今诸事愿，胜如旧，人生强健。",
    "日有熹，月有光，富且昌，寿而康。",
    "Every moment is a fresh beginning.——T.S. Eliot",
    "The best is yet to come.——Frank Sinatra",
    "Cheers to a new year and another chance for us to get it right.——Oprah Winfrey",
    "Tomorrow is the first blank page of a 365-page book. Write a good one.——Brad Paisley",
    "New year, new feels, new chances. Same dreams, fresh starts.——Unknown",
    "This is a new year. A new beginning. And things will change.——Taylor Swift",
    "The magic in new beginnings is truly the most powerful of them all.——Josiyah Martin",
    "A journey of a thousand miles begins with a single step.——Lao Tzu",
    "Take the first step in faith. You don't have to see the whole staircase.——Martin Luther King Jr.",
    "The future belongs to those who believe in the beauty of their dreams.——Eleanor Roosevelt",
    "It is never too late to be what you might have been.——George Eliot",
    "The secret of getting ahead is getting started.——Mark Twain",
    "Your present circumstances don't determine where you can go.——Benjamin Hardy",
    "Don't live the same year 75 times and call it a life.——Robin Sharma",
    "Write it on your heart that every day is the best day in the year.——Ralph Waldo Emerson",
    "The first step towards getting somewhere is to decide you're not going to stay where you are.——J.P. Morgan",
    "New beginnings are in order, and you are bound to feel some level of excitement as new chances come your way.——Auliq Ice",
    "Every new beginning comes from some other beginning's end.——Seneca",
    "Although no one can go back and make a brand new start, anyone can start from now and make a brand new ending.——Carl Bard",
    "The beginning is the most important part of the work.——Plato",
    "C'est la vie.（这就是生活）——法语",
    "Carpe diem.（及时行乐）——拉丁语",
    "Veni, vidi, vici.（我来，我见，我征服）——拉丁语",
    "Cogito, ergo sum.（我思故我在）——拉丁语",
    "La vita è bella.（生活是美好的）——意大利语",
    "Viva la vida.（生命万岁）——西班牙语",
    "Que sera, sera.（未来会怎样）——西班牙语",
    "L'avenir appartient à ceux qui se lèvent tôt.（未来属于早起的人）——法语",
    "Le temps guérit tout.（时间治愈一切）——法语",
    "Das Leben ist schön.（生活是美好的）——德语",
    "Anfang ist immer schwer.（万事开头难）——德语",
    "一期一会。（一生仅一次的相会）——日语",
    "花は桜木人は武士。（花数樱花，人数武士）——日语",
    "시간은 금이다.（时间就是金钱）——韩语",
    "하늘의 별 따기.（海底捞月）——韩语",
    "人生は短く、美しく生きよ。（人生短暂，要活得精彩）——日语",
    "明日は明日の風が吹く。（明天有明天的风）——日语",
    "过去属于死神，未来属于你自己。——雪莱（英）",
    "冬天来了，春天还会远吗？——雪莱（英）",
    "成功的秘诀在于恒心。——迪斯雷利（英）",
    "最困难的时候，就是距离成功不远了。——拿破仑（法）",
    "我成功，因为我志在成功。——拿破仑（法）",
    "不想当将军的士兵不是好士兵。——拿破仑（法）",
    "生命在于运动。——伏尔泰（法）",
    "读书使人心明眼亮。——伏尔泰（法）",
    "天赋是埋藏在矿里的黄金，才能是挖掘矿藏的矿工。——布莱希特（德）",
    "最本质的人生价值就是人的独立性。——布迪曼（印尼）",
    "向前跨一步，可能会发现一条意外的小路。生命如走钢丝。——松下幸之助（日）",
    "人的一生，总是难免有浮沉。——松下幸之助（日）",
    "所谓青春，就是心理的年轻。——松下幸之助（日）",
    "唯有行动才能改变命运。——稻盛和夫（日）",
    "人生的道路都是由心来描绘的。——稻盛和夫（日）",
    "人生的意义在于修炼灵魂。——稻盛和夫（日）",
    "态度决定一切。——米卢",
    "细节决定成败。——汪中求",
    "2026，愿你我都能活成自己喜欢的样子。",
    "新年新目标：暴富、暴瘦、暴开心。",
    "一岁一礼，一寸欢喜。",
    "平安喜乐，万事胜意。",
    "祝你，祝我，祝我们：都好在新的一年。",
    "愿新的一年，三餐四季，温柔有趣。",
    "愿你新年快乐，岁岁平安，年年有余。",
    "新年flag：不熬夜、不拖延、不焦虑。",
    "2026，请对我好一点，拜托了！",
    "新的一年，做个温暖的人，不卑不亢，清澈善良。",
    "愿你所有的努力都不被辜负。",
    "愿你熬过万丈孤独，藏下星辰大海。",
    "愿你眼里总有光芒，手里总有鲜花。",
    "愿你成为自己的太阳，无需凭借谁的光。",
    "愿你以梦为马，不负韶华，不负自己。",
    "愿你一路繁花似锦，归来仍是少年。",
    "愿你被这个世界温柔以待。",
    "愿你前程似锦，未来可期。",
    "愿你三冬暖，愿你春不寒，愿你天黑有灯，下雨有伞。",
    "愿你所遇皆良善，所行化坦途。",
    "愿你遍历山河，觉得人间值得。",
    "愿你走出半生，归来仍是少年。",
    "愿你有盔甲也有软肋，心中有傲骨也有慈悲。",
    "愿你一生温暖纯良，不舍爱与自由。",
    "愿你的付出都有回报，愿你的等待都不被辜负。",
    "愿你被生活温柔以待，愿所有美好不期而遇。",
    "愿你既有软肋又有盔甲，愿你从容不迫。",
    "愿你熬过所有苦难，迎来春暖花开。",
    "愿你一生有山可靠，有树可栖，与心爱之人，春赏花，夏纳凉，秋登山，冬扫雪。",
    "愿你一生努力，一生被爱，想要的都拥有，得不到的都释怀。",
    "愿你有高跟鞋也有跑鞋，喝茶也喝酒。",
    "愿你有勇敢的朋友，也有牛逼的对手。",
    "愿你特别美丽，特别平静，特别凶狠，也特别温柔。",
    "愿你始终有初心模样，一生热爱不遗憾。",
    "愿你一生果敢，一生坦荡，一路披荆斩棘。",
    "愿你一生清澈明朗，做你愿意做的事，爱你愿意爱的人。",
    "愿你一生温暖，一生被爱，一生充满希望。",
    "愿你一生有梦可依，有树可栖，有爱人相伴。",
    "愿你一生有良人相伴，有热爱之事可做。",
    "愿你一生有梦，有诗，有远方。",
    "愿你一生有光有热，有方向有力量。",
    "愿你一生有收获，有成长，有幸福。",
    "愿你一生有欢笑，有泪水，有感动。",
    "愿你一生有朋友，有家人，有爱人。",
    "愿你一生有目标，有追求，有成就。",
    "愿你一生有勇气，有智慧，有担当。",
    "愿你一生有信念，有坚持，有成功。",
    "愿你一生有爱，有恨，有原谅。",
    "愿你一生有来处，有归途，有港湾。",
    "愿你一生有故事可讲，有人可爱，有梦可追。",
    "愿你一生有酒有肉有朋友，有诗有梦有远方。",
    "愿你一生有高跟鞋更有跑鞋，有茶有酒有朋友。",
    "愿你一生有诗和远方，也有眼前的苟且。",
    "愿你一生有梦，有爱，有钱，有闲。",
    "愿你一生有梦为马，随处可栖。",
    "愿你一生有良人相伴，有热爱之事可做。",
    "愿你一生有光有热，有方向有力量。",
    "愿你一生有收获，有成长，有幸福。",
    "愿你一生有欢笑，有泪水，有感动。",
    "愿你一生有朋友，有家人，有爱人。",
    "愿你一生有目标，有追求，有成就。",
    "愿你一生有勇气，有智慧，有担当。",
    "愿你一生有信念，有坚持，有成功。",
    "愿你一生有爱，有恨，有原谅。",
    "愿你一生有来处，有归途，有港湾。",
    "愿你一生有故事可讲，有人可爱，有梦可追。",
    "愿你一生有酒有肉有朋友，有诗有梦有远方。",
    "愿你一生有高跟鞋更有跑鞋，有茶有酒有朋友。",
    "愿你一生有诗和远方，也有眼前的苟且。",
    "愿你一生有梦，有爱，有钱，有闲。",
    "愿你一生有梦为马，随处可栖。",
    "愿你一生有良人相伴，有热爱之事可做。",
    "愿你一生有光有热，有方向有力量。",
    "愿你一生有收获，有成长，有幸福。",
    "愿你一生有欢笑，有泪水，有感动。",
    "愿你一生有朋友，有家人，有爱人。",
    "愿你一生有目标，有追求，有成就。",
    "愿你一生有勇气，有智慧，有担当。",
    "愿你一生有信念，有坚持，有成功。",
    "愿你一生有爱，有恨，有原谅。",
    "愿你一生有来处，有归途，有港湾。",
    "愿你一生有故事可讲，有人可爱，有梦可追。",
    "愿你一生有酒有肉有朋友，有诗有梦有远方。",
    "愿你一生有高跟鞋更有跑鞋，有茶有酒有朋友。",
    "愿你一生有诗和远方，也有眼前的苟且。",
    "愿你一生有梦，有爱，有钱，有闲。",
    "愿你一生有梦为马，随处可栖。",
    "愿你一生有良人相伴，有热爱之事可做。",
    "愿你一生有光有热，有方向有力量。",
    "愿你一生有收获，有成长，有幸福。",
    "愿你一生有欢笑，有泪水，有感动。",
    "愿你一生有朋友，有家人，有爱人。",
    "愿你一生有目标，有追求，有成就。",
    "愿你一生有勇气，有智慧，有担当。",
    "愿你一生有信念，有坚持，有成功。",
    "愿你一生有爱，有恨，有原谅。",
    "愿你一生有来处，有归途，有港湾。",
    "愿你一生有故事可讲，有人可爱，有梦可追。",
    "愿你一生有酒有肉有朋友，有诗有梦有远方。",
    "愿你一生有高跟鞋更有跑鞋，有茶有酒有朋友。",
    "愿你一生有诗和远方，也有眼前的苟且。",
    "愿你一生有梦，有爱，有钱，有闲。",
    "愿你一生有梦为马，随处可栖。",
    "愿你一生有良人相伴，有热爱之事可做。",
    "愿你一生有光有热，有方向有力量。",
    "愿你一生有收获，有成长，有幸福。",
    "愿你一生有欢笑，有泪水，有感动。",
    "愿你一生有朋友，有家人，有爱人。",
    "愿你一生有目标，有追求，有成就。",
    "愿你一生有勇气，有智慧，有担当。",
    "愿你一生有信念，有坚持，有成功。",
    "愿你一生有爱，有恨，有原谅。",
    "愿你一生有来处，有归途，有港湾。",
    "愿你一生有故事可讲，有人可爱，有梦可追。"
  ];
  
  export default {
    async fetch(request, env, ctx) {
      return new Response(generateHTML(), { headers: { "Content-Type": "text/html;charset=UTF-8" }});
    }
  };
  
  function generateHTML() {
    // 把上面服务器端的 BLESSINGS 数组也注入到客户端脚本中 (stringify)
    const blessingsForClient = JSON.stringify(BLESSINGS);
  
    return `<!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>2026 新年祈福连击</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&display=swap');
          :root { --primary: #FFD700; --accent: #FF4500; --bg-dark: #1a0505; --glass: rgba(255, 255, 255, 0.05); --glass-border: rgba(255, 215, 0, 0.3); }
          * { box-sizing: border-box; }
          body {
              margin: 0; background-color: var(--bg-dark);
              background-image: radial-gradient(circle at 50% 50%, #2c0404 0%, #000000 100%);
              color: var(--primary); font-family: "Noto Serif SC", serif;
              overflow: hidden; display:flex; flex-direction:column; align-items:center; justify-content:center;
              height:100vh; text-align:center; user-select:none; -webkit-tap-highlight-color: transparent;
          }
          #bg-canvas, #fireworks { position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; }
          #fireworks { z-index:20; }
          #app { z-index:10; width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative; }
          .glass-panel {
              background: var(--glass); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
              border: 1px solid var(--glass-border); border-radius:20px; padding:40px; box-shadow:0 8px 32px rgba(0,0,0,0.37);
              width:90%; max-width:350px; transform: translateY(20px); opacity:0; transition: all 0.5s ease;
          }
          @media (max-width:360px) { .glass-panel { padding:25px 15px; } }
          .fade-in-up { animation: fadeInUp 0.8s forwards ease-out; }
          @keyframes fadeInUp { to { opacity:1; transform: translateY(0); } }
          h2 { margin-bottom:20px; font-weight:normal; letter-spacing:2px; }
          .btn-start {
              width:100%; padding:12px 0; font-size:1.1rem; background:linear-gradient(45deg,#d4af37,#f9d423);
              color:#2c0404; border:none; border-radius:50px; cursor:pointer; font-weight:bold; box-shadow:0 4px 15px rgba(212,175,55,0.4);
              transition: transform 0.2s;
          }
          .btn-start:active { transform: scale(0.95); }
          #main-view { width:100%; height:100%; position:relative; display:none; }
          .text-container { position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); width:90%; pointer-events:none; transition:all 0.5s ease; }
          #text-display { font-family:'Ma Shan Zheng', cursive; font-size:2.2rem; line-height:1.4; color:#fff; text-shadow:0 0 10px rgba(255,215,0,0.6); min-height:120px; transition:opacity 0.3s; }
          #count-display { font-family:'Courier New', monospace; margin-top:10px; color:rgba(255,255,255,0.6); font-size:1rem; }
          #game-btn {
              position: fixed; width:120px; height:120px; border-radius:50%; background: radial-gradient(circle at 30% 30%, #ff6b6b, #8b0000);
              border:2px solid #ffd700; box-shadow:0 0 20px rgba(255,69,0,0.6); color:#fff; font-weight:bold; font-size:1rem;
              cursor:pointer; z-index:100; display:flex; align-items:center; justify-content:center; text-align:center; padding:10px;
              transition: transform 0.1s ease-out; -webkit-user-select:none; touch-action: manipulation;
          }
          #game-btn::after {
              content:''; position:absolute; top:-10px; left:-10px; right:-10px; bottom:-10px; border-radius:50%;
              border:1px solid rgba(255,215,0,0.3); animation:pulse 2s infinite;
          }
          @keyframes pulse { 0% { transform:scale(1); opacity:0.5 } 100% { transform:scale(1.3); opacity:0 } }
          .finished-state { display:flex !important; flex-direction:column; align-items:center; justify-content:center; }
          .finished-state .text-container { position:relative; top:auto; left:auto; transform:none; margin-bottom:40px; }
          .finished-state #game-btn { position:relative !important; left:auto !important; top:auto !important; width:auto; height:auto; border-radius:50px; padding:15px 50px; background:#d4af37; color:#000; box-shadow:0 0 30px #d4af37; transform:none !important; }
          .finished-state #text-display { font-size:4.5rem; color:#FFD700; animation:textGlow 1.5s infinite alternate; }
          @keyframes textGlow { from { text-shadow:0 0 10px #FFD700 } to { text-shadow:0 0 40px #FFD700, 0 0 80px #FF0000 } }
          footer { position:fixed; bottom:15px; font-size:0.75rem; color:rgba(255,255,255,0.3); width:100%; z-index:5; }
      </style>
  </head>
  <body>
      <canvas id="bg-canvas"></canvas>
      <canvas id="fireworks"></canvas>
  
      <div id="app">
          <!-- 登录视图已改为直接开始（去掉专属号码输入） -->
          <div id="login-view" class="glass-panel fade-in-up">
              <h2 style="color:var(--primary);">🧧 2026 迎新祈福</h2>
              <div style="font-size:0.9rem; color:#ccc; margin-bottom:20px;">谨供纪念</div>
              <button class="btn-start" onclick="startJourney()">开启祈福之旅</button>
          </div>
  
          <div id="main-view">
              <div class="text-container">
                  <h1 id="text-display">点击按钮以继续</h1>
                  <p id="count-display"></p>
              </div>
              <button id="game-btn" onmousedown="handleBtnClick(event)" ontouchstart="handleBtnClick(event)">
                  开启我的<br>新年祝福
              </button>
          </div>
      </div>
  
      <footer>©创意工作室 | Power by Cloudflare Workers & Gemini & ChatGPT | <a href="https://github.com/waji-rui/ConsecutiveBlessing/">Github</a></footer>
  
      <script>
          // --------- 前端状态（全部本地） ----------
          // **关键修复**：将祝福数组注入到客户端（之前服务器端有但浏览器端没有）
          const BLESSINGS = ${blessingsForClient};
  
          let currentCount = 0;
          const TARGET_COUNT = 2026;
          const COOKIE_NAME = 'blessingCount';
  
          // ---------- Cookie 工具 ----------
          function setCookie(name, value, days) {
              const d = new Date();
              d.setTime(d.getTime() + (days||365)*24*60*60*1000);
              document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;expires=" + d.toUTCString();
          }
          function getCookie(name) {
              const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
              return v ? decodeURIComponent(v.pop()) : null;
          }
          function deleteCookie(name) {
              document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          }
  
          // ---------- 启动流程 ----------
          function startJourney() {
              const loginView = document.getElementById('login-view');
              loginView.style.transform = "scale(0.8)";
              loginView.style.opacity = "0";
              setTimeout(() => {
                  loginView.style.display = 'none';
                  document.getElementById('main-view').style.display = 'block';
                  // 从 cookie 读取当前计数
                  const saved = parseInt(getCookie(COOKIE_NAME) || '0', 10);
                  currentCount = isNaN(saved) ? 0 : saved;
                  updateProgressText();
                  if (currentCount >= TARGET_COUNT) {
                      showFinishState();
                  } else {
                      resetButtonPosition();
                  }
              }, 400);
          }
  
          // ---------- 点击逻辑（全部本地，不再发送请求） ----------
          function handleBtnClick(e) {
              if (e.type === 'touchstart') e.preventDefault();
              if (currentCount >= TARGET_COUNT) return;
  
              moveButtonRandomly();
  
              currentCount++;
              setCookie(COOKIE_NAME, currentCount, 365);
              updateProgressText();
  
              // ⭐ 关键：如果刚好完成，直接进入完成态，不再显示随机文案
              if (currentCount >= TARGET_COUNT) {
                  showFinishState();
                  return;
              }
  
              const textDisplay = document.getElementById('text-display');
              textDisplay.style.opacity = 0;
              setTimeout(() => {
                  textDisplay.innerText =
                  BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
                  textDisplay.style.opacity = 1;
              }, 120);
          }
  
  
          function updateProgressText() {
              document.getElementById('count-display').innerText = \`福气值: \${currentCount} / \${TARGET_COUNT}\`;
          }
  
          // ---------- 按钮位置控制 ----------
          function resetButtonPosition() {
              const btn = document.getElementById('game-btn');
              btn.style.left = 'calc(50% - 60px)';
              btn.style.top = '60%';
          }
  
          function moveButtonRandomly() {
              const btn = document.getElementById('game-btn');
              const txt = document.querySelector('.text-container').getBoundingClientRect();
              const btnSize = 120;
              const padding = 20;
              const maxX = window.innerWidth - btnSize - padding;
              const maxY = window.innerHeight - btnSize - padding;
              let x, y;
              let safe = false;
              let attempts = 0;
              while (!safe && attempts < 50) {
                  x = padding + Math.random() * (maxX - padding);
                  y = padding + Math.random() * (maxY - padding);
                  const btnLeft = x, btnRight = x + btnSize, btnTop = y, btnBottom = y + btnSize;
                  if (btnRight < txt.left - 20 || btnLeft > txt.right + 20 || btnBottom < txt.top - 20 || btnTop > txt.bottom + 20) {
                      safe = true;
                  }
                  attempts++;
              }
              btn.style.left = x + 'px';
              btn.style.top = y + 'px';
              btn.style.transform = \`rotate(\${Math.random()*20 - 10}deg)\`;
          }
  
          // ---------- 完成状态与重置 ----------
          function showFinishState() {
              const btn = document.getElementById('game-btn');
              const display = document.getElementById('text-display');
              const mainView = document.getElementById('main-view');
  
              mainView.classList.add('finished-state');
  
              btn.style.left = '';
              btn.style.top = '';
              btn.style.transform = '';
  
              display.innerText = "新年快乐";
              document.getElementById('count-display').innerText = "2026 祈福圆满";
  
              btn.innerHTML = "清零再来";
              btn.disabled = false;
              btn.onmousedown = resetJourney;
              btn.ontouchstart = function(e){ e.preventDefault(); resetJourney(); };
              startFireworks();
          }
  
          function resetJourney() {
              
              deleteCookie(COOKIE_NAME);
              location.reload();
  
          }
  
          // ---------- 背景粒子效果（保持不变） ----------
          (function initBackground() {
              const canvas = document.getElementById('bg-canvas');
              const ctx = canvas.getContext('2d');
              let width, height; let particles = [];
              function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
              window.addEventListener('resize', resize);
              resize();
              class Particle { constructor(){ this.reset(); } reset(){ this.x = Math.random()*width; this.y = Math.random()*height; this.size = Math.random()*2; this.speedX = Math.random()*0.5 - 0.25; this.speedY = Math.random()*0.5 - 0.25; this.alpha = Math.random()*0.5; this.growing = Math.random()>0.5; } update(){ this.x += this.speedX; this.y += this.speedY; if (this.x<0||this.x>width||this.y<0||this.y>height) this.reset(); if(this.growing){ this.alpha += 0.005; if(this.alpha>0.8) this.growing=false; } else { this.alpha -= 0.005; if(this.alpha<0.1) this.growing=true; } } draw(){ ctx.fillStyle = \`rgba(255,215,0,\${this.alpha})\`; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); } }
              for(let i=0;i<50;i++) particles.push(new Particle());
              function animate(){ ctx.clearRect(0,0,width,height); particles.forEach(p=>{p.update(); p.draw();}); requestAnimationFrame(animate); }
              animate();
          })();
  
          // ---------- 烟花效果（保持不变） ----------
          function startFireworks() {
              const canvas = document.getElementById('fireworks');
              const ctx = canvas.getContext('2d');
              canvas.width = window.innerWidth; canvas.height = window.innerHeight;
              let fireworks = [];
              class Firework {
                  constructor() {
                      this.x = Math.random()*canvas.width;
                      this.y = canvas.height;
                      this.targetY = canvas.height*0.2 + Math.random()*canvas.height*0.5;
                      this.speed = 5 + Math.random()*5;
                      this.angle = -Math.PI/2 + (Math.random()*0.2 - 0.1);
                      this.vx = Math.cos(this.angle) * this.speed;
                      this.vy = Math.sin(this.angle) * this.speed;
                      this.hue = Math.random()*360; this.particles = []; this.exploded = false;
                  }
                  update() {
                      if(!this.exploded) { this.x += this.vx; this.y += this.vy; this.vy += 0.05; if(this.vy >= 0 || this.y <= this.targetY) this.explode(); }
                      else {
                          for(let i=this.particles.length-1;i>=0;i--){ this.particles[i].update(); if(this.particles[i].alpha<=0) this.particles.splice(i,1); }
                      }
                  }
                  explode(){ this.exploded = true; for(let i=0;i<50;i++) this.particles.push(new Spark(this.x,this.y,this.hue)); }
                  draw(){ if(!this.exploded){ ctx.fillStyle = \`hsl(\${this.hue},100%,50%)\`; ctx.beginPath(); ctx.arc(this.x,this.y,3,0,Math.PI*2); ctx.fill(); } else { this.particles.forEach(p=>p.draw()); } }
              }
              class Spark {
                  constructor(x,y,hue){ this.x=x; this.y=y; const angle=Math.random()*Math.PI*2; const speed=Math.random()*4+1; this.vx=Math.cos(angle)*speed; this.vy=Math.sin(angle)*speed; this.gravity=0.1; this.friction=0.95; this.alpha=1; this.hue=hue+Math.random()*20-10; }
                  update(){ this.vx *= this.friction; this.vy *= this.friction; this.vy += this.gravity; this.x += this.vx; this.y += this.vy; this.alpha -= 0.015; }
                  draw(){ ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = \`hsl(\${this.hue},100%,60%)\`; ctx.beginPath(); ctx.arc(this.x,this.y,2,0,Math.PI*2); ctx.fill(); ctx.restore(); }
              }
              function loop() {
                  ctx.globalCompositeOperation = 'destination-out';
                  ctx.fillStyle = 'rgba(0,0,0,0.2)';
                  ctx.fillRect(0,0,canvas.width,canvas.height);
                  ctx.globalCompositeOperation = 'lighter';
                  if (Math.random() < 0.05) fireworks.push(new Firework());
                  for (let i = fireworks.length - 1; i >= 0; i--) {
                      fireworks[i].update(); fireworks[i].draw();
                      if (fireworks[i].exploded && fireworks[i].particles.length === 0) fireworks.splice(i, 1);
                  }
                  requestAnimationFrame(loop);
              }
              loop();
          }
      </script>
  </body>
  </html>`;
  }
  