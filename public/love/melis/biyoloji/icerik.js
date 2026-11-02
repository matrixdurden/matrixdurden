// 10. sınıf biyoloji, 1. tema: Enerji (MEB Türkiye Yüzyılı Maarif Modeli, BİY.10.1.1 – BİY.10.1.10).
// Programın "verilmez" dediği ayrıntılar her konuda "skip" kutusunda ayrıca yazılı.
// yaz: "y1" = 1. ortak yazılıda soru çıkan konu, "y2" = 2. yazılıda eklenen konu (2026-2027 konu-soru dağılımı).

const GRUPLAR=[
 {id:"gunes",kick:"1. bölüm",title:"Güneşten Besinlere",sub:"Enerji nereden geliyor, besin nasıl yapılıyor?"},
 {id:"besin",kick:"2. bölüm",title:"Besinlerden Enerjiye",sub:"Yediğin lokma nasıl ATP'ye dönüşüyor?"}
];

const KONULAR=[
{id:"atp",grup:"gunes",hue:"sun",em:"⚡",title:"Enerji ve ATP",sub:"Hücrenin bozuk parası",kod:"BİY.10.1.1",yaz:"y1",
 idea:`Bütün canlıların ortak <b>enerji parası</b>: ATP.`,
 analogy:`Besinler bankadaki büyük para gibi; hücre onu doğrudan harcayamaz. Önce bozuk paraya, yani ATP'ye çevirir. Kasılan kas, düşünen beyin, büyüyen hücre: hepsi ATP ile ödeme yapar.`,
 know:[
  {h:"Canlı neden enerjiye muhtaç?",b:`Yaşamak sürekli iş yapmak demek:<ul><li>büyüme ve onarım (yeni protein, yeni hücre)</li><li>hareket (kas kasılması)</li><li>maddeleri zarın öbür yanına pompalamak (aktif taşıma)</li><li>sinirsel iletim</li><li>vücut ısısını korumak</li></ul>Enerji akışı durursa düzen bozulur ve canlı ölür. Bu enerjinin kaynağı neredeyse her zaman <b>Güneş</b>: bitki ışığı besine çevirir, biz o besini yeriz.`},
  {h:"ATP'nin yapısı",b:`<span class="f">Adenin + Riboz + 3 Fosfat<small>adenin: azotlu organik baz · riboz: 5 karbonlu şeker</small></span>Adenin + riboz birlikte <b>adenozin</b> diye anılır. Üç fosfat eklenince <b>A</b>denozin <b>T</b>ri<b>F</b>osfat olur. Fosfatlar arasındaki bağlar çok enerji taşır: bunlara <b>yüksek enerjili bağ</b> denir.`},
  {h:"Harca ve yeniden yükle",b:`<span class="f">ATP + H₂O → ADP + P + enerji<small>hidroliz: enerji açığa çıkar, hücre bunu kullanır</small></span><span class="f">ADP + P + enerji → ATP + H₂O<small>dehidrasyon sentezi: enerji ATP'ye yüklenir</small></span>Telefon şarjı gibi: <b>ADP</b> yarı boş batarya, <b>ATP</b> dolu batarya. Hücre gün boyu ikisi arasında gidip gelir.`},
  {h:"ATP'nin 5 altın özelliği",b:`<ol><li><b>Bütün canlı hücreler</b> kendi ATP'sini üretir. Virüsler üretemez, çünkü hücreleri yoktur.</li><li>Hücreden hücreye <b>taşınmaz</b>; her hücre kendi ATP'sini kendisi yapar.</li><li>Hücrede <b>depolanmaz</b>; hızla harcanır, hızla yeniden yapılır. Uzun süreli depo yağ ve glikojendir.</li><li>Enerjiyi küçük, kullanışlı paketler hâlinde verir. Glikozun enerjisi bir anda açığa çıksa çoğu ısı olup kaçardı.</li><li>ATP <b>fotosentez</b>, <b>hücresel solunum</b> ve <b>fermantasyon</b> sırasında üretilir.</li></ol>`},
  {h:"Enerji zinciri",b:`<span class="f">Işık → (fotosentez) → glikoz → (solunum) → ATP → iş</span>Her dönüşümde enerjinin bir kısmı <b>ısı</b> olarak açığa çıkar. Bu yüzden enerji, maddeler gibi döngü yapmaz; sürekli Güneş'ten akmak zorundadır.`}
 ],
 skip:`ATP sentezinin hangi yollarla yapıldığı (substrat düzeyinde fosforilasyon, fotofosforilasyon, oksidatif fosforilasyon) bu yıl <b>verilmiyor</b>.`,
 trap:[`ATP'deki şeker <b>riboz</b>, deoksiriboz değil.`,`"ATP depolanır" yanlış. Depo yağ ve glikojen.`,`ATP'nin parçalanması enerji <b>verir</b>, yapılması enerji <b>ister</b>.`],
 ex:{q:"Melis 100 metre koşuyor. Bacak kaslarındaki enerji nereden geliyor, sırayla anlat.",steps:[
  `Kahvaltıdaki ekmek sindirilir, glikoz kana geçer ve kas hücresine taşınır.`,
  `Kas hücresi glikozu <b>hücresel solunumla</b> yıkar; açığa çıkan enerjiyle ADP + P'den <b>ATP</b> yapar.`,
  `Kas kasılırken ATP → ADP + P + enerji. Kasılmayı bu enerji sağlar.`,
  `ADP hemen yeniden ATP'ye çevrilir. Koşu boyunca bu döngü durmadan döner 🎉`]},
 mc:[
  {q:`ATP molekülünün yapısında hangisi <b>bulunmaz</b>?`,o:[`Adenin`,`Riboz`,`Deoksiriboz`,`Fosfat`],a:2,e:`ATP'nin şekeri <b>riboz</b>. Deoksiriboz DNA'nın şekeridir.`},
  {q:`ATP + H₂O → ADP + P tepkimesi için hangisi doğrudur?`,o:[`Enerji harcanır`,`Enerji açığa çıkar`,`Su açığa çıkar`,`Fosfat sayısı artar`],a:1,e:`ATP su ile parçalanınca (hidroliz) <b>enerji açığa çıkar</b> ve hücre bu enerjiyi kullanır.`},
  {q:`Hangisi ATP'nin özelliklerinden <b>değildir</b>?`,o:[`Bütün canlı hücrelerde üretilir`,`Hücrede uzun süre depolanır`,`Hücreler arasında taşınmaz`,`Enerjiyi küçük paketler hâlinde verir`],a:1,e:`ATP <b>depolanmaz</b>, sürekli üretilip harcanır. Uzun süreli enerji deposu yağ ve glikojendir.`},
  {q:`Hangi olayda ATP <b>harcanmaz</b>?`,o:[`Kas kasılması`,`Protein sentezi`,`Aktif taşıma`,`Oksijenin zardan difüzyonla geçmesi`],a:3,e:`Difüzyon, çok yoğun ortamdan az yoğun ortama <b>kendiliğinden</b> olur; ATP istemez.`},
  {q:`Virüslerin ATP üretememesinin nedeni nedir?`,o:[`Fosfat bulunmaması`,`Hücresel yapılarının olmaması`,`Işık kullanamamaları`,`Çok küçük olmaları`],a:1,e:`ATP üretmek için enzimleri ve metabolizması olan bir <b>hücre</b> gerekir. Virüs hücre değildir; girdiği hücrenin ATP'sini kullanır.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`"Güneş olmasaydı yalnızca bitkiler mi etkilenirdi?" sorusunu enerji akışıyla cevapla.`,h:`Senin yediğin besinin enerjisi ilk nereden geliyor?`,a:`Hayır. Bitkiler ışık enerjisini besindeki kimyasal enerjiye çevirir. Hayvanlar ve insanlar bu besinleri ya da bitki yiyenleri yer. Güneş olmazsa fotosentez durur, besin üretimi biter ve <b>neredeyse bütün canlılar</b> etkilenir. (Kemosentez yapan bazı bakteriler ve onlara bağlı canlılar hariç.)`},
  {l:"Biraz zor",q:`Bir hücrede ATP üretimi tamamen durursa ne olur? İki örnekle açıkla.`,h:`ATP depolanabiliyor mu?`,a:`ATP depolanmadığı için hücre kısa sürede enerjisiz kalır. Enerji isteyen olaylar durur: örneğin <b>aktif taşıma</b> (zar pompaları) ve <b>protein sentezi</b>. Kas hücresiyse kasılamaz, sinir hücresiyse iletim yapamaz. Sonunda hücre ölür.`}
 ],
 note:`ATP hücrede depolanmıyor, geldiği gibi harcanıyor. Ben de sana olan sevgimi biriktiremiyorum, hepsini hemen sana harcıyorum. ⚡💚`},

{id:"foto",grup:"gunes",hue:"leaf",em:"☀️",title:"Fotosentez",sub:"Işığı şekere paketlemek",kod:"BİY.10.1.2",yaz:"y1",
 idea:`Bitki, <b>ışık enerjisini</b> glikozun bağlarına kimyasal enerji olarak paketler.`,
 analogy:`Kloroplast iki odalı bir fabrika. 1. oda (<b>tilakoid</b>) güneş panelli şarj istasyonu: ışıkla ATP ve NADPH doldurur. 2. oda (<b>stroma</b>) mutfak: bu şarjla havadaki CO₂'den şeker pişirir.`,
 know:[
  {h:"Genel denklem",b:`<span class="f">6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O<small>ışık enerjisi + klorofil + enzimler</small></span><b>Kullanılan:</b> CO₂, su, ışık. <b>Üretilen:</b> glikoz, O₂ ve su. Bazı kitaplar kısaca 6CO₂ + 6H₂O yazar; ikisi de doğru.`},
  {h:"1. aşama · Işığın kullanıldığı tepkimeler",b:`<b>Yer:</b> tilakoid zarları (granalar).<ul><li>Klorofil ışığı soğurur.</li><li>Su ışık enerjisiyle parçalanır: <b>fotoliz</b>. O₂ açığa çıkar.</li><li>Elektron taşıma sistemi çalışır; <b>ATP</b> ve <b>NADPH</b> üretilir.</li></ul>Soluduğumuz O₂ CO₂'den değil, <b>sudan</b> gelir!`},
  {h:"2. aşama · Işığın kullanılmadığı tepkimeler",b:`<b>Yer:</b> stroma. Adı <b>Calvin döngüsü</b>.<ul><li>Havadan gelen CO₂ tutulur.</li><li>1. aşamadan gelen ATP ve NADPH harcanarak glikoz yapılır.</li><li>ADP, P ve NADP⁺ geri tilakoide döner.</li></ul>Işığa doğrudan ihtiyaç yok ama ATP-NADPH stoğu bitince durur. Yani karanlıkta uzun süremez. Enzimlerle yürüdüğü için <b>sıcaklıktan</b> çok etkilenir.`},
  {h:"Pigmentler: ışığı yakalayan renkler",b:`<ul><li><b>Klorofil</b> (yeşil): asıl pigment. Kırmızı ve mavi-mor ışığı en iyi soğurur, yeşili yansıtır. Yaprak bu yüzden yeşil görünür.</li><li><b>Karoten</b> (turuncu, havuç), <b>ksantofil</b> (sarı), <b>likopen</b> (kırmızı, domates): yardımcı pigmentler. Klorofilin kaçırdığı ışığı yakalayıp ona aktarırlar, fazla ışığa karşı korurlar.</li></ul>Sonbaharda klorofil yıkılır, sarı-turuncu pigmentler ortaya çıkar.`},
  {h:"Kimler fotosentez yapar?",b:`Bitkiler, algler, öglena gibi bazı protistler ve <b>siyanobakteriler</b>. Siyanobakterilerde kloroplast yoktur; klorofil ve enzimler sitoplazmadaki zar kıvrımlarındadır. Fotosentez için şart olan şey kloroplast değil, <b>klorofil + enzim</b>.`},
  {h:"İki aşama birbirine muhtaç",b:`<span class="f">Tilakoid → ATP + NADPH → Stroma<small>stroma → ADP + P + NADP⁺ → tilakoid</small></span>Biri durursa öbürü de bir süre sonra durur.`}
 ],
 skip:`Fotosistem çeşitleri, devirli-devirsiz fotofosforilasyon, Calvin döngüsünün ara basamakları, C4 ve CAM bitkileri, pigmentlerin kimyasal yapısı ve klorofil çeşitleri bu yıl <b>verilmiyor</b>.`,
 trap:[`O₂ <b>sudan</b> gelir, CO₂'den değil.`,`"Işıktan bağımsız tepkimeler karanlıkta sonsuza kadar sürer" yanlış.`,`Yaprak yeşili <b>yansıttığı</b> için yeşil; yeşil ışık en az kullanılan ışık.`],
 ex:{q:"Işıkta duran bir bitki karanlık bir dolaba konuyor. Fotosentezin iki aşamasına ne olur?",steps:[
  `Işıkta: tilakoidde ATP ve NADPH üretilir, Calvin döngüsü bunları kullanarak glikoz yapar.`,
  `Karanlığa alınınca <b>ışığın kullanıldığı tepkimeler hemen durur</b>: fotoliz biter, O₂ çıkışı kesilir, yeni ATP-NADPH gelmez.`,
  `Calvin döngüsü stromadaki ATP-NADPH stoğu kadar bir süre daha çalışır.`,
  `Stok bitince o da durur. "Işığın kullanılmadığı" demek "karanlıkta hep çalışır" demek değil 🎉`]},
 mc:[
  {q:`Fotosentezde açığa çıkan oksijenin kaynağı nedir?`,o:[`CO₂`,`Su`,`Glikoz`,`Klorofil`],a:1,e:`O₂, suyun ışıkla parçalanmasından (<b>fotoliz</b>) gelir.`},
  {q:`Işığın kullanıldığı tepkimeler kloroplastın neresinde gerçekleşir?`,o:[`Stroma`,`Tilakoid zarı`,`Dış zar`,`Ribozom`],a:1,e:`Klorofil <b>tilakoid zarlarında</b> bulunur; ışık burada yakalanır.`},
  {q:`Hangisi Calvin döngüsünde <b>gerçekleşmez</b>?`,o:[`CO₂'nin tutulması`,`ATP harcanması`,`NADPH harcanması`,`Suyun ışıkla parçalanması`],a:3,e:`Fotoliz, ışığın kullanıldığı tepkimelerde, <b>tilakoidde</b> olur.`},
  {q:`Bir yaprağın yeşil görünmesinin sebebi nedir?`,o:[`Klorofilin yeşil ışığı en çok soğurması`,`Klorofilin yeşil ışığı yansıtması`,`Karotenin yeşil olması`,`Glikozun yeşil olması`],a:1,e:`Klorofil yeşil ışığı <b>yansıtır</b>; gözümüze gelen ışık yeşildir.`},
  {q:`Sonbaharda yaprakların sararmasının nedeni nedir?`,o:[`Karotenin yeni üretilmesi`,`Klorofilin yıkılıp sarı-turuncu pigmentlerin görünür olması`,`Fotosentezin hızlanması`,`Yaprağa su dolması`],a:1,e:`Sarı-turuncu pigmentler yaz boyunca da oradaydı; <b>klorofil yıkılınca</b> ortaya çıkarlar.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Fotosentezin iki aşamasını yer, kullanılan ve üretilen maddeler bakımından karşılaştır.`,h:`Biri tilakoidde, biri stromada.`,a:`<b>Işığın kullanıldığı:</b> tilakoid zarı · kullanılan: ışık, su, ADP, P, NADP⁺ · üretilen: O₂, ATP, NADPH.<br><b>Calvin döngüsü:</b> stroma · kullanılan: CO₂, ATP, NADPH · üretilen: glikoz, ADP, P, NADP⁺.`},
  {l:"Biraz zor",q:`Siyanobakterilerde kloroplast yok ama fotosentez yapıyorlar. Bu nasıl mümkün?`,h:`Fotosentez için asıl şart olan iki şey ne?`,a:`Fotosentez için kloroplast değil, <b>klorofil ve fotosentez enzimleri</b> gerekir. Siyanobakterilerde bunlar sitoplazmadaki zar sistemlerinde bulunur.`}
 ],
 note:`Bitki ışığı alıp şekere çeviriyor. Ben de senin gülüşünü alıp bütün günümün enerjisine çeviriyorum. ☀️🌿`},

{id:"fdeney",grup:"gunes",hue:"water",em:"🔬",title:"Fotosentez Deneyleri",sub:"Kabarcık say, değişkeni bul",kod:"BİY.10.1.3",yaz:"y1",
 idea:`Fotosentez <b>deney deney</b> çözüldü. Şimdi deneyi sen tasarlıyorsun.`,
 analogy:`Deney, tek bir şeyi değiştirip ne olduğuna bakmaktır. Lambayı yaklaştırınca kabarcık artıyor mu? Değiştirdiğin şey <b>bağımsız</b>, ölçtüğün şey <b>bağımlı</b> değişkendir.`,
 know:[
  {h:"Fotosentezi bulduran 5 deney",b:`<ol><li><b>Van Helmont</b> (1600'ler): Söğüt fidanını 5 yıl yalnızca suyla büyüttü. Ağaç yaklaşık 74 kg arttı, toprak yalnızca 57 g azaldı. "Kütle topraktan değil sudan geliyor" dedi. Yarı haklıydı: asıl kaynak havadaki CO₂'ydi ama o zaman bilinmiyordu.</li><li><b>Priestley</b> (1771): Kapalı fanusta mum söndü, fare yaşayamadı. İçine nane konunca hava "düzeldi": bitki havayı yeniliyordu (O₂).</li><li><b>Ingenhousz</b> (1779): Bunun için <b>ışık</b> gerektiğini ve yalnız <b>yeşil kısımların</b> bunu yaptığını gösterdi.</li><li><b>Hill</b> (1937): Kloroplastları hücreden ayırdı. Işıkta, CO₂ olmadan bile O₂ çıktı: O₂ <b>sudan</b> geliyordu.</li><li><b>Calvin</b> (1950'ler): İşaretli (radyoaktif) karbonla CO₂'nin şekere giden yolunu izledi: <b>Calvin döngüsü</b>.</li></ol>`},
  {h:"Değişkenler",b:`<ul><li><b>Bağımsız:</b> senin değiştirdiğin (lambanın uzaklığı)</li><li><b>Bağımlı:</b> ölçtüğün (dakikadaki kabarcık)</li><li><b>Kontrol edilen:</b> sabit tuttukların (sıcaklık, CO₂, bitki türü, süre)</li><li><b>Kontrol grubu:</b> karşılaştırma için değişiklik yapılmayan düzenek</li></ul>Su bitkisinden çıkan kabarcıklar O₂'dir; kabarcık sayısı <b>fotosentez hızını</b> gösterir.`},
  {h:"Fotosentez hızını etkileyen çevre faktörleri",b:`<div id="grafikler"></div><ul><li><b>Işık şiddeti</b> ve <b>CO₂</b>: artınca hız artar, bir noktadan sonra sabitlenir.</li><li><b>Sıcaklık</b>: enzimler yüzünden en uygun (optimum) sıcaklığa kadar artar, sonra hızla düşer.</li><li><b>Işığın rengi</b>: kırmızı ve mavi-mor en iyi, yeşil en kötü.</li><li><b>Su</b> ve <b>mineraller</b>: Mg ve N klorofil yapımı için gerekir.</li></ul>`},
  {h:"Minimum kuralı",b:`Fotosentez hızını, <b>en yetersiz olan</b> faktör belirler. Tahtaları farklı boyda bir fıçı düşün: fıçı ancak <b>en kısa tahta</b> kadar su tutar. Işık bol ama CO₂ azsa, lambayı yaklaştırmak işe yaramaz; CO₂ eklemek gerekir.`},
  {h:"Nişasta (iyot) deneyi",b:`<ol><li>Bitkiyi 1-2 gün karanlıkta tut; yapraktaki nişasta harcansın.</li><li>Bir yaprağın bir kısmını alüminyum folyoyla kapat, bitkiyi ışığa koy.</li><li>Yaprağı kaynat, sonra sıcak alkolde klorofilini çıkar.</li><li>İyot damlat: nişasta olan yer <b>mavi-mor</b> olur.</li></ol>Işık alan kısım boyanır, folyolu kısım sarı-kahverengi kalır. <b>Alacalı</b> yaprakta da yalnızca yeşil kısımlar boyanır: fotosentez için <b>ışık</b> ve <b>klorofil</b> şart.`}
 ],
 skip:`Fotosenteze etki eden <b>genetik</b> (iç) faktörler bu yıl verilmiyor; yalnızca çevresel faktörler.`,
 trap:[`Lamba ısı da yayar. Sıcaklığı sabit tutmak için bitkiyle lamba arasına su dolu bir kap koy.`,`Deneyi tek kez değil, <b>3 kez</b> yap ve ortalamasını al.`,`Bağımlı değişken "ölçülen"dir; "bitki" ya da "lamba" değildir.`],
 ex:{q:"Ali su bitkisini lambadan 10, 20 ve 30 cm uzağa koyup 1 dakikada çıkan kabarcıkları sayıyor: 40, 22, 10. Değişkenleri ve sonucu yaz.",steps:[
  `Bağımsız değişken: lambanın uzaklığı, yani <b>ışık şiddeti</b>.`,
  `Bağımlı değişken: dakikadaki <b>kabarcık sayısı</b> (O₂ çıkışı = fotosentez hızı).`,
  `Kontrol edilenler: su sıcaklığı, CO₂ miktarı, bitkinin türü ve büyüklüğü, sayım süresi.`,
  `Sonuç: Lamba uzaklaştıkça ışık şiddeti azalır, kabarcık azalır. Işık şiddeti fotosentez hızını etkiler 🎉`]},
 mc:[
  {q:`Priestley'in deneyinde nane, kapalı fanustaki havayı neden "düzeltti"?`,o:[`CO₂ üretti`,`O₂ üretti`,`Su buharı üretti`,`Isı üretti`],a:1,e:`Nane fotosentezle <b>O₂</b> üretti; mum yeniden yanabildi, fare yaşayabildi.`},
  {q:`Işık şiddeti arttığı hâlde fotosentez hızı artmıyorsa en olası neden hangisidir?`,o:[`Bitki ölmüştür`,`Başka bir faktör (örneğin CO₂) sınırlayıcı olmuştur`,`Işık fotosentezi etkilemez`,`Klorofil artmıştır`],a:1,e:`<b>Minimum kuralı:</b> hız, en yetersiz faktöre takılır.`},
  {q:`Sıcaklık 30 °C'den 50 °C'ye çıkınca fotosentez hızı düşüyor. Sebebi nedir?`,o:[`Işık azalmıştır`,`Enzimlerin yapısı bozulmuştur`,`CO₂ artmıştır`,`Su artmıştır`],a:1,e:`Fotosentez enzimlerle yürür; yüksek sıcaklıkta <b>enzimlerin yapısı bozulur</b>.`},
  {q:`Folyolu yaprak deneyinde bağımlı değişken hangisidir?`,o:[`Folyonun kapladığı alan`,`Yaprağın iyotla renk değiştirmesi`,`Bitkinin türü`,`Kaynatma süresi`],a:1,e:`Ölçülen sonuç, iyotla boyanma (yani <b>nişasta</b> varlığı).`},
  {q:`Hangi renk ışıkta fotosentez hızı en düşüktür?`,o:[`Kırmızı`,`Mavi`,`Yeşil`,`Mor`],a:2,e:`Klorofil <b>yeşil</b> ışığı yansıtır, en az onu kullanır.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Işık şiddetinin fotosentez hızına etkisini ölçen bir deney tasarla. Amacını, hipotezini ve değişkenlerini yaz.`,h:`Su bitkisi, lamba, cetvel, kronometre.`,a:`<b>Amaç:</b> Işık şiddetinin fotosentez hızına etkisini bulmak.<br><b>Hipotez:</b> Işık şiddeti artarsa fotosentez hızı artar.<br><b>Bağımsız:</b> lambanın uzaklığı · <b>Bağımlı:</b> dakikadaki kabarcık · <b>Kontrol edilen:</b> sıcaklık, CO₂, bitki, süre.<br><b>Önlem:</b> lamba ile kap arasına su koy, her ölçümü 3 kez yapıp ortalamasını al.`},
  {l:"Biraz zor",q:`Van Helmont'un vardığı sonuç neden eksikti?`,h:`Bitki kütlesinin çoğu havadaki hangi gazdan gelir?`,a:`Kütle artışının yalnızca <b>sudan</b> geldiğini düşündü. Oysa kütlenin büyük kısmı havadaki <b>CO₂</b>'den gelir; fotosentezle glikoza dönüşür. O dönemde CO₂ bilinmiyordu.`}
 ],
 note:`Kabarcıkları saydık, deney bitti. Ama seni düşündüğüm anları saymaya kalksam hiçbir sayaç yetmez. 🔬💚`},

{id:"kemo",grup:"gunes",hue:"plum",em:"🌋",title:"Kemosentez",sub:"Işıksız besin üretimi",kod:"BİY.10.1.4",yaz:"",
 idea:`Işık yok mu? Sorun değil. Bazı bakteriler besini <b>kimyasal enerjiyle</b> yapar.`,
 analogy:`Fotosentez güneş paneliyle çalışan bir fabrika. Kemosentez aynı fabrikanın <b>jeneratörle</b> çalışan hâli: yakıt güneş değil, inorganik maddeler.`,
 know:[
  {h:"Tanım",b:`Bazı bakteri ve arkeler; amonyak, hidrojen sülfür, demir gibi <b>inorganik maddeleri oksitleyerek</b> enerji elde eder ve bu enerjiyle <b>CO₂'den organik besin</b> yapar. Klorofil ve ışık gerekmez; gece-gündüz, toprak altında, okyanus dibinde olur.`},
  {h:"Nerede yaşarlar?",b:`<ul><li><b>Okyanus dibindeki hidrotermal bacalar:</b> ışığın hiç ulaşmadığı derinlikte, bacadan sıcak ve kükürtlü su çıkar. Kükürt bakterileri buradaki ekosistemin üreticisidir.</li><li><b>Toprak:</b> nitrifikasyon bakterileri amonyağı bitkilerin kullanabileceği <b>nitrata</b> çevirir; toprak verimlenir.</li><li><b>Demir ve kükürt bakterileri:</b> maden ve kaplıca sularında.</li><li><b>Çöplükler, bataklıklar:</b> oksijensiz ortamdaki bazı mikroorganizmalar enerji elde ederken metan gazı açığa çıkarır. Biriken metan patlamalara yol açabilir.</li></ul>`},
  {h:"Işıksız bir ekosistem",b:`Hidrotermal bacalarda bütün besin zinciri kemosentetik bakterilere dayanır. Dev <b>tüp solucanlarının</b> ağzı ve sindirim kanalı yoktur; bakteriler onların vücudunda yaşar ve onları besler. Midyeler, yengeçler, balıklar da bu zincirin parçasıdır.`},
  {h:"Fotosentez mi, kemosentez mi?",b:`<div class="tbl"><table><tr><th></th><th>Fotosentez</th><th>Kemosentez</th></tr><tr><td>Enerji kaynağı</td><td>Işık</td><td>İnorganik maddelerin oksitlenmesi</td></tr><tr><td>Klorofil</td><td>Gerekir</td><td>Gerekmez</td></tr><tr><td>Kimler yapar</td><td>Bitki, alg, siyanobakteri</td><td>Bazı bakteri ve arkeler</td></tr><tr><td>Karbon kaynağı</td><td colspan="2" style="text-align:center">İkisinde de CO₂</td></tr><tr><td>Ürün</td><td colspan="2" style="text-align:center">İkisinde de organik besin</td></tr><tr><td>O₂ çıkışı</td><td>Var</td><td>Yok</td></tr></table></div>İkisi de <b>ototrof</b> (üretici) beslenmedir, ikisi de enzimlerle olur.`},
  {h:"Bonus: temizlikçi bakteriler",b:`Kemosentetik bakteriler maden atıklarını ve kirli suları temizlemekte kullanılabilir. Buna <b>biyoremediasyon</b> denir.`}
 ],
 skip:`Kemosentez <b>tepkimeleri</b> (denklemleri) bu yıl verilmiyor. Ne olduğunu, kimlerin yaptığını ve önemini bilmen yeterli.`,
 trap:[`Kemosentez yapanlar da <b>üreticidir</b>, ayrıştırıcı değil.`,`Karbon kaynağı inorganik madde değil, <b>CO₂</b>. İnorganik madde enerji kaynağı.`],
 ex:{q:"2500 m derinlikte, ışığın hiç ulaşmadığı bir bacanın çevresinde yengeçler ve tüp solucanları yaşıyor. Bu ekosistemin enerjisi nereden geliyor?",steps:[
  `Işık yok → fotosentez yapılamaz; bitki ve alg yok.`,
  `Bacadan çıkan sıcak su <b>hidrojen sülfür</b> gibi inorganik maddeler taşıyor.`,
  `Kükürt bakterileri bu maddeleri oksitleyip enerji alır, CO₂'den besin yapar: <b>kemosentez</b>. Üretici bunlar.`,
  `Tüp solucanları bakterilerle birlikte yaşar, yengeçler de onlardan beslenir. Zincirin temeli bakteriler 🎉`]},
 mc:[
  {q:`Kemosentez için hangisi <b>gerekli değildir</b>?`,o:[`CO₂`,`Enzim`,`Klorofil`,`İnorganik madde`],a:2,e:`Kemosentezde ışık kullanılmaz; <b>klorofile</b> gerek yoktur.`},
  {q:`Kemosentez ile fotosentezin ortak özelliği hangisidir?`,o:[`Işık enerjisi kullanılması`,`CO₂'den organik besin üretilmesi`,`Klorofil bulunması`,`Yalnızca gündüz gerçekleşmesi`],a:1,e:`İkisi de <b>CO₂'den organik besin</b> yapar; ikisi de ototrof beslenmedir.`},
  {q:`Nitrifikasyon bakterilerinin toprağa katkısı nedir?`,o:[`Toprağı asitlendirir`,`Amonyağı bitkilerin kullanabileceği nitrata çevirir`,`Fotosentez yapar`,`Bitkileri hastalandırır`],a:1,e:`Bitkiler azotu en çok <b>nitrat</b> olarak alır.`},
  {q:`Hangisi kemosentez yapabilir?`,o:[`Şapkalı mantar`,`Kükürt bakterisi`,`Su yosunu`,`Eğrelti otu`],a:1,e:`Kemosentezi yalnızca <b>bazı bakteri ve arkeler</b> yapar.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`"Bütün ekosistemlerin enerjisi Güneş'ten gelir." cümlesini değerlendir.`,h:`Okyanus dibini düşün.`,a:`<b>Eksik.</b> Hidrotermal bacalar gibi ışıksız ekosistemlerde enerji, <b>kemosentezle</b> inorganik maddelerden gelir. Ama Dünya'daki ekosistemlerin büyük çoğunluğu için cümle doğrudur.`},
  {l:"Biraz zor",q:`Bir bakterinin kemosentetik olduğunu bir deneyle nasıl gösterirsin?`,h:`Işık ve organik besin olmadan ne verirsin?`,a:`Bakteriyi <b>karanlıkta</b>, <b>organik besin vermeden</b>, yalnızca CO₂ ve bir inorganik madde (örneğin amonyak) olan ortamda üret. Çoğalabiliyorsa kemosentetiktir. Kontrol grubu: inorganik madde verilmeyen ortam.`}
 ],
 note:`Okyanusun dibinde bile hayat ışıksız yolunu buluyor. Ama benim yolumu hep sen aydınlatıyorsun. 🌊💚`},

{id:"sindirim",grup:"besin",hue:"berry",em:"🦷",title:"Sindirim Çeşitleri",sub:"Hücre içi, hücre dışı, diş, mide, bağırsak",kod:"BİY.10.1.5",yaz:"y1",
 idea:`Sindirim: büyük besini, hücreye <b>girebilecek kadar küçük</b> parçalara ayırmak.`,
 analogy:`Lego kaleyi kapıdan sokamazsın; parçalarına ayırırsın, içeride yeniden kurarsın. Nişasta → glikoz, protein → amino asit, yağ → yağ asidi + gliserol.`,
 know:[
  {h:"Mekanik ve kimyasal sindirim",b:`<b>Mekanik:</b> çiğneme, öğütme, çalkalama. Besin küçülür ama molekül değişmez.<br><b>Kimyasal:</b> enzimler, su katarak (hidroliz) molekülleri yapı taşlarına ayırır. Asıl sindirim budur.`},
  {h:"Hücre içi sindirim",b:`Besin hücreye alınır (endositoz) → <b>besin kofulu</b> → <b>lizozom</b> kaynaşır, enzimlerini boşaltır → küçük moleküller sitoplazmaya geçer, artıklar dışarı atılır.<br>Örnek: <b>amip</b>, <b>terliksi hayvan</b>. Bizim akyuvarlarımız da mikropları böyle yok eder (beslenmek için değil, savunma için).`},
  {h:"Hücre dışı sindirim",b:`Enzimler hücre dışına salgılanır, besin <b>dışarıda</b> sindirilir, sonra küçük moleküller emilir.<br>Örnek: <b>bakteriler</b>, <b>mantarlar</b> (çürükçül), <b>böcekçil bitkiler</b> (sinekkapan, ibrik bitkisi), sindirim kanalı olan bütün hayvanlar.`},
  {h:"İkisi birden",b:`<b>Hidra</b> ve <b>planarya</b>: Önce sindirim boşluğunda hücre dışı sindirim olur, besin küçülür. Sonra boşluğu döşeyen hücreler bu parçaları içine alıp sindirimi <b>hücre içinde</b> bitirir. Kanalın tek açıklığı vardır: ağız hem giriş hem çıkış.`},
  {h:"Dişler, mide, bağırsak: beslenmeye göre tasarım",b:`<div class="tbl"><table><tr><th></th><th>Dişler</th><th>Mide</th><th>Bağırsak</th></tr><tr><td>🐦 Kuş</td><td>Diş yok, gaga</td><td>Kursak + bezli mide + <b>taşlık</b></td><td>Kısa (uçmak için hafif)</td></tr><tr><td>🐺 Kurt (etçil)</td><td>Uzun sivri <b>köpek dişleri</b>, keskin azılar</td><td>Tek bölmeli, basit</td><td><b>Kısa</b>: et kolay sindirilir</td></tr><tr><td>🐄 İnek (otçul)</td><td>Köpek dişi ve üst kesici yok; geniş <b>düz azılar</b></td><td><b>4 bölmeli</b></td><td><b>Çok uzun</b>: selüloz zor sindirilir</td></tr><tr><td>🧑 İnsan (hepçil)</td><td>Her çeşitten dengeli</td><td>Tek bölmeli</td><td>Orta</td></tr></table></div>`},
  {h:"İneğin 4 bölmeli midesi",b:`<ol><li><b>İşkembe:</b> besin önce buraya gelir. İçindeki bakteri ve tek hücreliler <b>selülozu</b> sindirir.</li><li><b>Börkenek:</b> besini topak yapar ve ağza geri gönderir. İnek bunu yeniden çiğner: <b>geviş getirme</b>.</li><li><b>Kırkbayır:</b> suyu emer.</li><li><b>Şirden:</b> asıl (gerçek) mide; enzimler burada salgılanır.</li></ol>İnek selülozu kendi enzimiyle sindiremez; bu işi misafir <b>mikroorganizmalar</b> yapar. Koyun da böyledir; köpeğin midesi ise tek bölmelidir.`},
  {h:"Kuşun taşlığı",b:`Kuşun dişi yoktur. Besin önce <b>kursakta</b> depolanıp yumuşar, <b>bezli midede</b> enzimlerle karışır, sonra kaslı <b>taşlıkta</b>, kuşun yuttuğu küçük taşlarla öğütülür. Taşlık, dişin işini görür.`}
 ],
 skip:`Bu konuda sınırlama yok; ama sindirim <b>enzimlerinin adları</b> bu yıl hiç verilmiyor.`,
 trap:[`Mantarlar hücre <b>dışı</b> sindirim yapar.`,`Akyuvarın yaptığı da hücre içi sindirimdir.`,`Selülozu ineğin kendisi değil, işkembedeki <b>mikroorganizmalar</b> sindirir.`],
 ex:{q:"Bir hayvanın kafatasında köpek dişi yok, azı dişleri geniş ve düz, bağırsağı vücut boyunun yaklaşık 20 katı. Beslenme tipini ve mide yapısını tahmin et.",steps:[
  `Köpek dişi yok → avını yırtmıyor, <b>etçil değil</b>.`,
  `Geniş, düz azılar → öğütme yapıyor; <b>bitkisel</b> besin.`,
  `Çok uzun bağırsak → selüloz zor ve yavaş sindiriliyor.`,
  `Sonuç: <b>otçul</b>, büyük olasılıkla geviş getiren ve 4 bölmeli mideli (inek, koyun gibi) 🎉`]},
 mc:[
  {q:`Hangisinde <b>yalnızca</b> hücre içi sindirim görülür?`,o:[`İnsan`,`Amip`,`Mantar`,`Kurt`],a:1,e:`Amip besini yalancı ayaklarla içine alıp <b>besin kofulunda</b> sindirir.`},
  {q:`Mantarlarda sindirim nasıldır?`,o:[`Hücre içi`,`Hücre dışı`,`Hem hücre içi hem hücre dışı`,`Sindirim yapmazlar`],a:1,e:`Mantarlar enzimlerini dışarı salgılar, sindirilen maddeleri emer: <b>hücre dışı</b>.`},
  {q:`Hidrada sindirim için hangisi doğrudur?`,o:[`Yalnızca hücre içi`,`Yalnızca hücre dışı`,`Önce hücre dışı, sonra hücre içi`,`Sindirim yoktur`],a:2,e:`Sindirim boşluğunda başlar (<b>hücre dışı</b>), hücrelerin içinde biter (<b>hücre içi</b>).`},
  {q:`Kuşlarda dişin görevini hangi yapı üstlenir?`,o:[`Kursak`,`Taşlık`,`Kloak`,`Gaga`],a:1,e:`Kaslı <b>taşlık</b>, yutulan taşlarla besini öğütür.`},
  {q:`İnekte selülozun sindirildiği mide bölümü hangisidir?`,o:[`İşkembe`,`Kırkbayır`,`Şirden`,`Yemek borusu`],a:0,e:`<b>İşkembedeki</b> mikroorganizmalar selülozu sindirir.`},
  {q:`Otçulların bağırsağının etçillerden uzun olmasının nedeni nedir?`,o:[`Daha çok su içmeleri`,`Bitkisel besinin (selülozun) zor ve yavaş sindirilmesi`,`Vücutlarının daha büyük olması`,`Dişlerinin olmaması`],a:1,e:`Selüloz zor sindirilir; uzun bağırsak hem <b>zaman</b> hem <b>yüzey</b> kazandırır.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Kurt, inek ve insanı diş yapısı, mide yapısı ve bağırsak uzunluğu ölçütlerine göre karşılaştır.`,h:`Etçil, otçul, hepçil.`,a:`<b>Kurt:</b> sivri köpek dişleri · tek bölmeli mide · kısa bağırsak.<br><b>İnek:</b> köpek dişi yok, düz öğütücü azılar · 4 bölmeli mide · çok uzun bağırsak.<br><b>İnsan:</b> her çeşit diş dengeli · tek bölmeli mide · orta uzunlukta bağırsak.`},
  {l:"Biraz zor",q:`Köpek ve koyunun midesini benzer ve farklı yönleriyle karşılaştır.`,h:`Biri etçil, biri geviş getiren otçul.`,a:`<b>Farklı:</b> Köpeğin midesi tek bölmeli ve basit; koyununki 4 bölmeli, selülozu mikroorganizmalar sindirir, geviş getirir.<br><b>Benzer:</b> İkisinde de sindirim hücre dışıdır, ikisinin de midesinde kimyasal sindirim olur.`}
 ],
 note:`Lego'yu parçalarına ayırmayı öğrendik. Ama biz ikimiz hiç ayrılmayan tek parçayız. 🧩💚`},

{id:"insan",grup:"besin",hue:"teal",em:"🍽️",title:"İnsanda Sindirim",sub:"Sindirim, emilim, taşınma",kod:"BİY.10.1.6",yaz:"y2",
 idea:`Yediğin lokma hücrene ulaşana kadar <b>3 durak</b> geçer: sindirim → emilim → taşınma.`,
 analogy:`Bir metro hattı gibi: Besinler istasyonda (<b>ince bağırsak</b>) küçük yolculara ayrılır, vagona biner (<b>emilim</b>, kana geçiş), hat boyunca (<b>damarlar</b>) taşınır ve son durakta (<b>hücre</b>) iner.`,
 know:[
  {h:"Sindirim kanalı",b:`<span class="f">Ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs</span>Yardımcı organlar: <b>tükürük bezleri</b>, <b>karaciğer</b>, <b>pankreas</b>. Salgılarını kanala verirler; besin bunların içinden geçmez.`},
  {h:"Nerede ne sindirilir?",b:`<div class="tbl"><table><tr><th>Besin</th><th>Başlar</th><th>Biter</th><th>Yapı taşı</th></tr><tr><td>Karbonhidrat</td><td>Ağız</td><td>İnce bağırsak</td><td>Glikoz</td></tr><tr><td>Protein</td><td>Mide</td><td>İnce bağırsak</td><td>Amino asit</td></tr><tr><td>Yağ</td><td>İnce bağırsak</td><td>İnce bağırsak</td><td>Yağ asidi + gliserol</td></tr></table></div><b>Su, vitamin ve mineraller</b> sindirilmez, doğrudan emilir.`},
  {h:"Duraklar",b:`<ul><li><b>Ağız:</b> dişler parçalar (mekanik), tükürükte karbonhidrat sindirimi başlar.</li><li><b>Yemek borusu:</b> sindirim yok; besin dalga gibi kasılmalarla (<b>peristaltik hareket</b>) mideye iner.</li><li><b>Mide:</b> kaslı duvar besini çalkalar; asidik ortamda <b>protein</b> sindirimi başlar.</li><li><b>İnce bağırsak:</b> sindirim <b>tamamlanır</b>, emilimin çoğu burada olur. Karaciğerin yaptığı <b>safra</b> yağı küçük damlacıklara ayırır, pankreas öz suyu enzimleri getirir.</li><li><b>Kalın bağırsak:</b> enzim salgılanmaz; su ve mineraller emilir, yararlı bakteriler bazı vitaminleri (K, B) üretir.</li></ul>`},
  {h:"Emilim: ince bağırsak katlanmış bir halı",b:`İç yüzey kıvrımlıdır; kıvrımların üstünde parmak gibi <b>villuslar</b>, villus hücrelerinin üstünde de <b>mikrovilluslar</b> vardır. Yüzey alanı katlanarak büyür, emilim hızlanır. Emilim <b>difüzyon</b> ve <b>aktif taşıma</b> (ATP harcayarak) ile olur.`},
  {h:"Taşınma",b:`Emilen maddeler <b>dolaşım sistemiyle</b> bütün hücrelere taşınır. Hücrede glikoz, yağ asidi ve amino asit:<ul><li>solunumda yakılır → <b>ATP</b></li><li>yapı malzemesi olur (yeni protein, zar)</li><li>ya da depolanır (glikojen, yağ)</li></ul>`},
  {h:"Neden bu kadar uğraş?",b:`Hücre zarı büyük molekülleri geçirmez. Sindirim olmazsa besin kana geçemez; emilim olmazsa hücreye ulaşamaz; taşınma olmazsa yalnız bağırsak hücreleri beslenir. Üçü olmadan yediğin pilavın enerjisi <b>kas hücrene</b> ulaşamaz.`}
 ],
 skip:`Sindirimde görev alan <b>enzim ve hormonların adları</b> ve sindirim ürünlerinin kan ve lenfte izlediği <b>ayrıntılı yollar</b> bu yıl verilmiyor.`,
 trap:[`Yemek borusunda sindirim <b>olmaz</b>.`,`Safra enzim değildir; yağı damlacıklara ayırır (mekanik).`,`Sindirim <b>ince bağırsakta</b> biter, kalın bağırsakta değil.`],
 ex:{q:"Melis kahvaltıda peynirli tost yedi: ekmek, peynir, tereyağı. Her birinin yolculuğunu yaz.",steps:[
  `Ekmek (nişasta): sindirimi <b>ağızda</b> başlar, ince bağırsakta <b>glikoza</b> kadar sindirilir.`,
  `Peynir (protein): <b>midede</b> başlar, ince bağırsakta <b>amino asitlere</b> ayrılır.`,
  `Tereyağı (yağ): ince bağırsakta safra onu damlacıklara ayırır; <b>yağ asidi + gliserole</b> sindirilir.`,
  `Hepsi villuslardan emilir, dolaşımla hücrelere taşınır ve orada ATP'ye dönüşür 🎉`]},
 mc:[
  {q:`Protein sindirimi nerede başlar?`,o:[`Ağız`,`Mide`,`İnce bağırsak`,`Kalın bağırsak`],a:1,e:`Protein sindirimi asidik ortamda, <b>midede</b> başlar.`},
  {q:`Hangisi sindirilmeden emilir?`,o:[`Nişasta`,`Protein`,`Vitamin`,`Yağ`],a:2,e:`<b>Vitamin</b>, su ve mineraller zaten küçüktür; sindirilmeden emilir.`},
  {q:`İnce bağırsakta emilimi artıran yapılar hangileridir?`,o:[`Villus ve mikrovilluslar`,`Safra damlaları`,`Kursak ve taşlık`,`Tükürük bezleri`],a:0,e:`<b>Villus ve mikrovilluslar</b> yüzey alanını çok büyütür.`},
  {q:`Yemek borusu için hangisi doğrudur?`,o:[`Kimyasal sindirim yapar`,`Besini peristaltik hareketle mideye iletir`,`Su emer`,`Yağları sindirir`],a:1,e:`Yemek borusu yalnızca <b>iletir</b>; sindirim yapmaz.`},
  {q:`Safranın görevi nedir?`,o:[`Proteinleri amino asitlere ayırmak`,`Yağları küçük damlacıklara ayırıp sindirimi kolaylaştırmak`,`Nişastayı sindirmek`,`Su emmek`],a:1,e:`Safra yağı <b>damlacıklara</b> ayırır; enzimlerin çalışacağı yüzey artar.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Villuslar olmasaydı ne olurdu?`,h:`Yüzey alanı → emilim → enerji.`,a:`Yüzey alanı çok küçülür, <b>emilim yavaşlar</b>. Besinlerin bir kısmı emilemeden atılır. Hücrelere yeterli glikoz ve amino asit ulaşmaz, ATP üretimi azalır; kişi yese de enerjisiz kalır.`},
  {l:"Biraz zor",q:`Sindirim, emilim ve taşınmanın enerji eldesi için neden gerekli olduğunu tek paragrafta açıkla.`,h:`Enerji hücrede, mitokondride üretiliyor.`,a:`Enerji (ATP) <b>hücrelerde</b>, hücresel solunumla üretilir. Hücre zarı büyük besin moleküllerini geçirmediği için önce <b>sindirim</b> onları yapı taşlarına ayırır. <b>Emilim</b> bu yapı taşlarını bağırsaktan kana geçirir. <b>Taşınma</b> onları bütün hücrelere ulaştırır. Biri eksik kalırsa besin hücreye ulaşmaz ve ATP üretilemez.`}
 ],
 note:`Yediğin her lokma yolunu bulup hücrene ulaşıyor. Benim her düşüncem de dolaşıp dolaşıp sana ulaşıyor. 🍽️💚`},

{id:"solunum",grup:"besin",hue:"coral",em:"🔥",title:"Hücresel Solunum",sub:"Glikoliz, Krebs, ETS",kod:"BİY.10.1.7",yaz:"y2",
 idea:`Hücre glikozu adım adım <b>yakar</b> ve enerjisini ATP'ye aktarır.`,
 analogy:`Glikozu bir anda yaksan şömine gibi alev alır, enerjinin çoğu ısı olup kaçar. Hücre bunu merdivenden basamak basamak iner gibi yapar ve her basamakta enerjiyi <b>ATP'ye</b> toplar.`,
 know:[
  {h:"Genel denklem",b:`<span class="f">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + enerji (ATP)</span>Fotosentezin tersi gibi. Ökaryotlarda <b>sitoplazma + mitokondride</b>, prokaryotlarda sitoplazma ve hücre zarında olur.`},
  {h:"1 · Glikoliz",b:`<b>Yer:</b> sitoplazma. <b>O₂ gerekmez.</b><span class="f">Glikoz (6C) → 2 Pirüvat (3C)</span>2 ATP harcanır, 4 ATP üretilir → <b>net 2 ATP</b>. Ayrıca 2 NADH. Oksijenli solunumda da fermantasyonda da ilk adımdır; bütün canlılarda ortaktır.`},
  {h:"2 · Pirüvatın oksidasyonu",b:`<b>Yer:</b> mitokondri matriksi.<span class="f">Pirüvat (3C) → Asetil CoA (2C) + CO₂</span>Her pirüvattan 1 CO₂ ve 1 NADH çıkar. Bir glikozdan 2 pirüvat olduğu için bu adım <b>2 kez</b> olur.`},
  {h:"3 · Krebs (sitrik asit) döngüsü",b:`<b>Yer:</b> mitokondri matriksi.<span class="f">2C + 4C → 6C → 5C → 4C<small>her ok bir CO₂ kaybı; 4C döngüye geri döner</small></span>Her turda: <b>2 CO₂, 1 ATP, 3 NADH, 1 FADH₂</b>. Bir glikoz için <b>2 tur</b> döner.`},
  {h:"4 · Elektron taşıma sistemi (ETS)",b:`<b>Yer:</b> mitokondri iç zarı (kristalar).<ul><li>NADH ve FADH₂ elektronlarını ETS'ye bırakır.</li><li>Elektronların son durağı <b>O₂</b>'dir: O₂ + H⁺ + elektron → <b>su</b>.</li><li>ATP'nin <b>büyük kısmı</b> burada üretilir.</li></ul>O₂ yoksa ETS durur, ETS durunca Krebs de durur.`},
  {h:"Glikoz başına hesap",b:`<div class="tbl"><table><tr><th>Aşama</th><th>ATP</th><th>NADH</th><th>FADH₂</th><th>CO₂</th></tr><tr><td>Glikoliz</td><td>2 (net)</td><td>2</td><td>–</td><td>–</td></tr><tr><td>Pirüvat oks.</td><td>–</td><td>2</td><td>–</td><td>2</td></tr><tr><td>Krebs (2 tur)</td><td>2</td><td>6</td><td>2</td><td>4</td></tr><tr><td>ETS</td><td>en çok</td><td colspan="2">harcanır</td><td>–</td></tr></table></div>Glikozun <b>6 karbonu</b> da CO₂ olarak çıkar. Toplam ATP için kitabın hangi sayıyı veriyorsa onu kullan (çoğunlukla 38). Asıl fikir: oksijenli solunum, fermantasyondan (2 ATP) <b>kat kat fazla</b> ATP verir.`},
  {h:"O₂, CO₂ ve su nerede?",b:`<ul><li><b>O₂</b> yalnızca ETS'de kullanılır.</li><li><b>CO₂</b> pirüvat oksidasyonunda ve Krebs'te çıkar.</li><li><b>Su</b> ETS'de oluşur.</li></ul>Koşarken neden hızlı nefes alıyoruz? Kaslar çok ATP ister → ETS'ye daha çok O₂ lazım, oluşan CO₂ de atılmalı.`}
 ],
 skip:`Krebs döngüsünün <b>ara tepkimeleri</b>, ETS'deki proteinlerin adları ve yapısı, <b>kemiozmoz</b> bu yıl verilmiyor. Krebs'te yalnızca karbon sayısındaki değişimi ve çıkan ürünleri bil.`,
 trap:[`Glikoliz oksijen <b>istemez</b>.`,`O₂ CO₂'ye dönüşmez; O₂ <b>suya</b> dönüşür.`,`Glikolizde 4 ATP üretilir ama <b>net</b> kazanç 2'dir.`],
 ex:{q:"Bir hücreye işaretli (radyoaktif) oksijen atomlu O₂ veriliyor. İşaretli oksijen hangi üründe görülür?",steps:[
  `O₂ solunumun hangi aşamasında kullanılıyor? Yalnızca <b>ETS'de</b>.`,
  `ETS'de O₂ elektronların son alıcısı; H⁺ ile birleşip <b>su</b> oluşturuyor.`,
  `CO₂'deki oksijen ise glikozdan ve sudan gelir, havadaki O₂'den değil.`,
  `Sonuç: İşaretli oksijen <b>suda</b> görülür 🎉`]},
 mc:[
  {q:`Glikoliz için hangisi <b>yanlıştır</b>?`,o:[`Sitoplazmada olur`,`Oksijen gerektirir`,`Net 2 ATP kazanılır`,`Glikoz 2 pirüvata ayrılır`],a:1,e:`Glikoliz <b>oksijensiz</b> de gerçekleşir; fermantasyonun da ilk adımıdır.`},
  {q:`Krebs döngüsü ökaryot hücrede nerede gerçekleşir?`,o:[`Sitoplazma`,`Mitokondri matriksi`,`Mitokondri dış zarı`,`Kloroplast`],a:1,e:`Krebs <b>matrikste</b>, ETS ise iç zarda.`},
  {q:`Oksijenli solunumda O₂'nin görevi nedir?`,o:[`Glikozu parçalamak`,`ETS'de son elektron alıcısı olmak`,`CO₂ oluşturmak`,`Krebs döngüsünü başlatmak`],a:1,e:`O₂ elektronları alır ve H⁺ ile <b>su</b> oluşturur.`},
  {q:`Bir glikozun oksijenli solunumu sonunda kaç CO₂ çıkar?`,o:[`2`,`4`,`6`,`12`],a:2,e:`2 (pirüvat oksidasyonu) + 4 (Krebs) = <b>6</b>. Glikozun 6 karbonunun hepsi.`},
  {q:`ATP'nin en çok üretildiği aşama hangisidir?`,o:[`Glikoliz`,`Pirüvat oksidasyonu`,`Krebs döngüsü`,`Elektron taşıma sistemi`],a:3,e:`NADH ve FADH₂'nin taşıdığı enerji <b>ETS'de</b> ATP'ye çevrilir.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Glikozun 6 karbonunun yolculuğunu aşama aşama yaz.`,h:`6 → 3+3 → 2+2 → …`,a:`<b>Glikoliz:</b> 6C → 2 × 3C (pirüvat).<br><b>Pirüvat oksidasyonu:</b> 2 × 3C → 2 × 2C (asetil CoA) + 2 CO₂.<br><b>Krebs:</b> her 2C, 4C ile birleşip 6C olur, 2 CO₂ verip 4C'ye döner. 2 turda 4 CO₂.<br><b>Toplam:</b> 6 CO₂.`},
  {l:"Biraz zor",q:`Hücrede O₂ biterse Krebs döngüsü neden durur? Hücre ne yapar?`,h:`Krebs'in ürettiği NADH nereye gidiyor?`,a:`O₂ yoksa ETS'de elektronlar son alıcıya aktarılamaz, <b>ETS durur</b>. NADH ve FADH₂ elektronlarını bırakamaz; Krebs'in ihtiyaç duyduğu NAD⁺ ve FAD geri kazanılamaz, <b>Krebs de durur</b>. Hücre glikolizden gelen 2 ATP ile idare eder ve <b>fermantasyona</b> yönelir.`}
 ],
 note:`Hücre glikozu basamak basamak yakıyor ki enerjisi boşa gitmesin. Ben de seninle geçen her anı öyle saklıyorum, hiçbiri boşa gitmiyor. 🔥💚`},

{id:"besinyol",grup:"besin",hue:"sun",em:"🥚",title:"Besinler Solunuma Nasıl Girer?",sub:"Karbonhidrat, yağ, protein",kod:"BİY.10.1.8",yaz:"y2",
 idea:`Karbonhidrat, yağ, protein… hepsi farklı kapılardan girer ama <b>aynı fabrikada</b> yakılır: Krebs + ETS.`,
 analogy:`Bir AVM'nin farklı kapıları var; kimi otoparktan, kimi ana kapıdan girer ama hepsi aynı yürüyen merdivenle üst kata çıkar. Ortak merdiven: <b>asetil CoA → Krebs → ETS</b>.`,
 know:[
  {h:"Karbonhidratlar: ana kapı",b:`Sindirilip <b>glikoz</b> olur ve glikolize <b>en baştan</b> girer. Hücrenin ilk tercih ettiği yakıttır. Fazlası karaciğer ve kasta <b>glikojen</b>, daha da fazlası <b>yağ</b> olarak depolanır.`},
  {h:"Yağlar: iki ayrı kapı",b:`Önce <b>gliserol</b> ve <b>yağ asitlerine</b> ayrılır.<ul><li><b>Gliserol</b> (3C) → glikolizin <b>ara basamağına</b> katılır.</li><li><b>Yağ asitleri</b> → 2 karbonlu parçalara bölünür, <b>asetil CoA</b> olarak Krebs'e girer.</li></ul>Gram başına <b>en çok enerji</b> verir. Uzun egzersizde ve açlıkta devreye girer.`},
  {h:"Proteinler: son çare",b:`Önce <b>amino asitlere</b> ayrılır.<ul><li>Amino grubu (–NH₂) koparılır → <b>amonyak</b> (zehirli) → karaciğerde <b>üreye</b> çevrilir, böbreklerle atılır.</li><li>Geriye kalan karbon iskeleti; yapısına göre <b>pirüvat</b>, <b>asetil CoA</b> ya da bir <b>Krebs ara ürünü</b> olarak girer.</li></ul>Protein yapıcı-onarıcıdır; enerji için <b>en son</b> kullanılır (uzun açlık).`},
  {h:"Kullanım sırası ve enerji değeri",b:`<span class="f">Karbonhidrat → Yağ → Protein</span><div id="enerjibar"></div>Yağın çok enerji vermesinin sebebi: çok C ve H, az O içerir. Yıkılınca daha çok NADH ve FADH₂, yani daha çok ATP çıkar.`},
  {h:"Benzerlik ve farklar",b:`<b>Benzer:</b><ul><li>Hepsi önce sindirilip yapı taşlarına ayrılır.</li><li>Hepsinin enerjisi sonunda <b>Krebs + ETS</b>'den geçer.</li><li>Hepsinden CO₂, su ve ATP çıkar.</li></ul><b>Farklı:</b><ul><li>Giriş noktaları farklı.</li><li>Yalnızca protein yıkımında <b>azotlu atık</b> (amonyak → üre) oluşur.</li><li>Gram başına enerji ve kullanılma sırası farklı.</li></ul>`}
 ],
 skip:`Yağ asitlerinin oksidasyon çeşitleri (alfa, beta, omega), amino asitlerin <b>transdeaminasyonu</b>, fruktoz ve galaktoz gibi şekerlerin glikolize nasıl girdiği bu yıl verilmiyor.`,
 trap:[`Gliserol Krebs'e değil, <b>glikolize</b> girer.`,`Azotlu atık yalnızca <b>protein</b> yıkımında oluşur.`,`"Karbon sayısı az olan önce girer" diye bir kural yok; molekülün <b>türü</b> belirler.`],
 ex:{q:"Bir sporcu 3 saattir koşuyor ve uzun süredir bir şey yemedi. Vücudu enerjiyi hangi sırayla nereden sağlar?",steps:[
  `İlk önce kandaki glikoz ve kas-karaciğerdeki <b>glikojen</b> kullanılır (karbonhidrat).`,
  `Glikojen azalınca <b>yağlar</b> devreye girer: gliserol glikolize, yağ asitleri asetil CoA olarak Krebs'e.`,
  `Çok uzun açlıkta <b>proteinler</b> de yıkılır; amino gruplarından amonyak, sonra üre oluşur.`,
  `Sıra: karbonhidrat → yağ → protein. Proteinin en sona kalması iyi, çünkü kaslar proteinden yapılı 🎉`]},
 mc:[
  {q:`Yağ asitleri hücresel solunuma hangi molekül olarak katılır?`,o:[`Glikoz`,`Pirüvat`,`Asetil CoA`,`Gliserol`],a:2,e:`Yağ asitleri 2C'li parçalara bölünüp <b>asetil CoA</b> olur.`},
  {q:`Hangisinin solunumda kullanılması sonucu <b>azotlu atık</b> oluşur?`,o:[`Glikoz`,`Yağ asidi`,`Amino asit`,`Gliserol`],a:2,e:`Yalnızca amino asitlerde azot (–NH₂) vardır; ondan <b>amonyak</b> oluşur.`},
  {q:`Gram başına en fazla enerji veren besin hangisidir?`,o:[`Karbonhidrat`,`Protein`,`Yağ`,`Vitamin`],a:2,e:`Yağ ≈ 9 kcal/g; karbonhidrat ve protein ≈ 4 kcal/g.`},
  {q:`Gliserol solunuma nereden katılır?`,o:[`Glikolizin ara basamağından`,`Doğrudan ETS'den`,`Krebs'in sonundan`,`Hiç katılmaz`],a:0,e:`Gliserol 3 karbonludur ve <b>glikolizin ortasından</b> girer.`},
  {q:`Karbonhidrat, yağ ve proteinin solunumunda <b>ortak</b> olan aşama hangisidir?`,o:[`Glikolizin ilk basamağı`,`Krebs döngüsü ve ETS`,`Amonyak oluşumu`,`Gliserolün yıkımı`],a:1,e:`Hangi kapıdan girerse girsin, hepsi <b>Krebs + ETS</b>'den geçer.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`"Hücresel solunumda kullanılan her besin Krebs döngüsüne girer mi?" sorusunu cevapla.`,h:`Glikoz, yağ asidi, amino asit nereye varıyor?`,a:`<b>Evet.</b> Glikoz pirüvat ve asetil CoA üzerinden, yağ asitleri asetil CoA olarak, gliserol glikoliz üzerinden, amino asitlerin karbon iskeleti pirüvat, asetil CoA ya da Krebs ara ürünü olarak sonunda Krebs'e varır. Krebs + ETS <b>ortak yoldur</b>.`},
  {l:"Biraz zor",q:`Portakal suyu, yumurta ve tereyağının enerji eldesi süreçlerini karşılaştır.`,h:`Hangisinde ne çok var?`,a:`<b>Portakal suyu</b> (karbonhidrat): glikoz → glikolize baştan girer, hızlı enerji.<br><b>Yumurta</b> (protein + yağ): amino asitler → amonyak atığı + karbon iskeleti Krebs'e; yağ kısmı gliserol ve yağ asidi yoluyla.<br><b>Tereyağı</b> (yağ): gliserol glikolize, yağ asitleri asetil CoA olarak; gram başına en çok enerji.`}
 ],
 note:`Her besin bir yoldan Krebs'e varıyor. Benim günüm de nereden başlarsa başlasın hep sende bitiyor. 🥚💚`},

{id:"ferm",grup:"besin",hue:"moss",em:"🍞",title:"Fermantasyon",sub:"Oksijensiz B planı",kod:"BİY.10.1.9",yaz:"y2",
 idea:`Oksijen yoksa hücre <b>B planına</b> geçer: fermantasyon.`,
 analogy:`Elektrik kesilince jeneratör çalışır: az güç verir ama hayat durmaz. Fermantasyon da oksijensiz ortamda glikozdan yalnızca <b>2 ATP</b> çıkarır, ama hücreyi yaşatır.`,
 know:[
  {h:"Temel özellikler",b:`<ul><li><b>O₂ kullanılmaz.</b></li><li><b>Sitoplazmada</b> olur; mitokondri gerekmez.</li><li>Glikoliz + bir son basamak. <b>Krebs ve ETS yok.</b></li><li>Glikoz tamamen yıkılmaz; ürünlerde hâlâ enerji kalır.</li><li>Net <b>2 ATP</b>; hepsi glikolizden.</li></ul>`},
  {h:"Etil alkol fermantasyonu",b:`<span class="f">Glikoz → 2 Etil alkol + 2 CO₂ + 2 ATP</span><b>Kim yapar:</b> maya mantarları, bazı bakteriler.<br><b>Nerede görürsün:</b> ekmek, pide, simit hamurunun kabarması. CO₂ hamuru kabartır, alkol fırında uçup gider.`},
  {h:"Laktik asit fermantasyonu",b:`<span class="f">Glikoz → 2 Laktik asit + 2 ATP<small>CO₂ çıkmaz!</small></span><b>Kim yapar:</b> laktik asit bakterileri; insanda <b>alyuvarlar</b> (mitokondrileri yok) ve oksijen yetmediğinde <b>çizgili kas</b> hücreleri.<br><b>Nerede görürsün:</b> yoğurt, ayran, peynir, turşu, kefir. Ağır egzersizde kasın laktik asit üretmesi yorgunluk hissiyle ilişkilendirilir.`},
  {h:"Sağlıkla ilgisi",b:`Yoğurt, kefir, turşu gibi fermente gıdalardaki <b>yararlı bakteriler</b> bağırsaktaki bakteri dengesini destekler, sindirim sağlığına iyi gelir.`},
  {h:"Oksijenli solunum mu, fermantasyon mu?",b:`<div class="tbl"><table><tr><th></th><th>Oksijenli solunum</th><th>Fermantasyon</th></tr><tr><td>O₂</td><td>Kullanılır</td><td>Kullanılmaz</td></tr><tr><td>Yer</td><td>Sitoplazma + mitokondri</td><td>Sitoplazma</td></tr><tr><td>Aşamalar</td><td>Glikoliz, Krebs, ETS</td><td>Glikoliz + son basamak</td></tr><tr><td>ATP</td><td>Çok (kitapta çoğunlukla 38)</td><td>2</td></tr><tr><td>Ürün</td><td>CO₂ + H₂O</td><td>Etil alkol + CO₂ ya da laktik asit</td></tr></table></div>Ortak: <b>glikoliz</b>, enzimler, ATP üretimi.`},
  {h:"Deney: balonlu şişeler",b:`3 şişeye ılık su ve maya koy, ağızlarına balon geçir:<ul><li><b>A:</b> + şeker</li><li><b>B:</b> şekersiz (<b>kontrol grubu</b>)</li><li><b>C:</b> + şeker, ama çok sıcak su</li></ul>A'nın balonu şişer (CO₂). Gazı <b>kireç suyundan</b> geçirirsen kireç suyu bulanıklaşır: CO₂ kanıtlanır. C'de maya ölür, balon şişmez. Bağımsız değişken: şeker / sıcaklık; bağımlı değişken: balonun şişmesi.`}
 ],
 skip:`Bu konuda ek bir sınırlama yok. Fermantasyonun gıda, ilaç ve biyoyakıt sanayisindeki kullanımı yalnızca <b>zenginleştirme</b>.`,
 trap:[`Laktik asit fermantasyonunda <b>CO₂ çıkmaz</b>.`,`Fermantasyonun ATP'si glikolizden gelir; "son basamakta ATP üretilir" yanlış.`,`Alyuvar oksijen taşır ama kendisi oksijenli solunum <b>yapmaz</b>.`],
 ex:{q:"Hamura maya katılıp ılık bir yerde bekletiliyor. Hamur kabarıyor ama fırında pişince alkol kokusu kalmıyor. Açıkla.",steps:[
  `Maya mantarları hamurdaki şekeri oksijensiz ortamda yıkar: <b>etil alkol fermantasyonu</b>.`,
  `Ürünlerden biri <b>CO₂</b>: hamurun içinde kabarcık oluşturup onu kabartır.`,
  `Öbür ürün <b>etil alkol</b>: fırının sıcaklığında buharlaşıp uçar.`,
  `Ilık ortam şart: mayanın enzimleri soğukta yavaş çalışır, çok sıcakta bozulur 🎉`]},
 mc:[
  {q:`Fermantasyon ile ilgili hangisi <b>yanlıştır</b>?`,o:[`Sitoplazmada olur`,`O₂ kullanılmaz`,`Krebs döngüsü gerçekleşir`,`Net 2 ATP elde edilir`],a:2,e:`Fermantasyonda Krebs ve ETS <b>yoktur</b>.`},
  {q:`Yoğurt yapımında hangi olay gerçekleşir?`,o:[`Etil alkol fermantasyonu`,`Laktik asit fermantasyonu`,`Oksijenli solunum`,`Kemosentez`],a:1,e:`Yoğurdu <b>laktik asit</b> bakterileri yapar.`},
  {q:`Laktik asit fermantasyonunda hangisi <b>oluşmaz</b>?`,o:[`ATP`,`Laktik asit`,`CO₂`,`Pirüvat (ara ürün)`],a:2,e:`Laktik asit fermantasyonunda <b>CO₂ çıkmaz</b>; etil alkolde çıkar.`},
  {q:`İnsanda ATP'sini yalnızca fermantasyonla üreten hücre hangisidir?`,o:[`Sinir hücresi`,`Alyuvar`,`Kas hücresi`,`Karaciğer hücresi`],a:1,e:`Olgun <b>alyuvarda</b> mitokondri yoktur.`},
  {q:`Maya deneyinde şekersiz şişenin görevi nedir?`,o:[`Bağımlı değişken`,`Kontrol grubu`,`Bağımsız değişken`,`Hata kaynağı`],a:1,e:`Karşılaştırma yapabilmek için değişiklik yapılmayan düzenek: <b>kontrol grubu</b>.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Etil alkol ve laktik asit fermantasyonunu 3 ölçüte göre karşılaştır.`,h:`Kim yapar, ürün ne, CO₂ var mı?`,a:`<b>Kim yapar:</b> maya ve bazı bakteriler / laktik asit bakterileri, alyuvar, kas.<br><b>Ürün:</b> etil alkol + CO₂ / laktik asit.<br><b>CO₂:</b> çıkar / çıkmaz.<br><b>Ortak:</b> O₂ kullanılmaz, sitoplazmada olur, net 2 ATP.`},
  {l:"Biraz zor",q:`Mayalı şişede balonu şişiren gazın CO₂ olduğunu nasıl kanıtlarsın?`,h:`Hangi sıvı CO₂ ile bulanıklaşır?`,a:`Gazı <b>kireç suyundan</b> geçir. Kireç suyu bulanıklaşırsa gaz CO₂'dir. Kontrol olarak boş balondaki havayı da aynı şekilde dene.`}
 ],
 note:`Oksijen yetmeyince hücre bile pes etmiyor, B planına geçiyor. Sen de hiç pes etmiyorsun, o yüzden seninle bu kadar gurur duyuyorum. 🍞💚`},

{id:"metab",grup:"besin",hue:"teal",em:"🏃‍♀️",title:"Enerji ve Metabolizma",sub:"Yapım, yıkım, kalori",kod:"BİY.10.1.10",yaz:"",
 idea:`Metabolizma: hücredeki <b>bütün</b> yapım ve yıkım tepkimeleri. ATP ikisinin arasındaki köprü.`,
 analogy:`Bir şehir düşün: bir yanda yeni binalar yapılıyor (<b>yapım</b>), bir yanda eskiler yıkılıyor (<b>yıkım</b>). Yıkımdan çıkan enerji, yapımı ve şehrin günlük işlerini döndürüyor.`,
 know:[
  {h:"Yapım ve yıkım",b:`<ul><li><b>Yıkım (katabolizma):</b> büyük molekül → küçük; enerji açığa çıkar. Örnek: hücresel solunum.</li><li><b>Yapım (anabolizma):</b> küçük → büyük; enerji harcanır. Örnek: protein sentezi, glikojen yapımı, fotosentez.</li></ul><span class="f">Metabolizma = yapım + yıkım</span>`},
  {h:"Besinden gelen enerji nereye gider?",b:`<ul><li>💪 <b>Kas faaliyetleri:</b> yürümek, kalbin atması, nefes almak</li><li>🧠 <b>Sinirsel iletim:</b> düşünmek, hissetmek. Beyin, dinlenirken vücudun enerjisinin yaklaşık beşte birini kullanır.</li><li>⛽ <b>Aktif taşıma:</b> zar pompaları</li><li>🧱 <b>Biyosentez:</b> protein, DNA, hormon yapımı; büyüme ve onarım</li><li>🌡️ <b>Vücut ısısı:</b> her dönüşümde enerjinin bir kısmı ısıya dönüşür; vücut ısımızı bununla koruruz</li></ul>`},
  {h:"Bazal metabolizma",b:`Hiç kıpırdamadan, yalnızca yaşamak için (kalp, solunum, hücrelerin bakımı) harcanan enerji. Günlük enerjinin <b>büyük kısmı</b> buraya gider. Yaş, cinsiyet, kas miktarı ve hareket onu etkiler.`},
  {h:"Besinlerin enerji değeri",b:`Besinin enerjisi içindeki bileşenlere bağlıdır:<span class="f">Yağ ≈ 9 · Karbonhidrat ≈ 4 · Protein ≈ 4<small>kcal / gram</small></span><b>Vitamin, mineral ve su enerji vermez</b> ama metabolizma onlarsız çalışmaz; örneğin vitaminler enzimlere yardım eder.`},
  {h:"Sağlıklı beslenme",b:`<ul><li><b>Hazır ve işlenmiş gıdalar:</b> çok şeker, yağ ve tuz; az lif ve vitamin. Fazla enerji yağ olarak depolanır.</li><li><b>Tek tip beslenme:</b> bazı yapı taşları ve vitaminler eksik kalır; metabolizma aksar.</li><li><b>Denge:</b> alınan enerji ≈ harcanan enerji.</li></ul>`}
 ],
 skip:`Kalori ölçen <b>bomba kalorimetre</b> yalnızca zenginleştirme konusu; nasıl çalıştığını bilmen gerekmiyor.`,
 trap:[`Vitaminler enerji <b>vermez</b>.`,`Dinlenirken de enerji harcanır (bazal metabolizma).`],
 ex:{q:"Melis'in günlük enerji ihtiyacı 2000 kcal. Bir gün 2600 kcal alıp 2000 kcal harcıyor. Fazla enerji ne olur?",steps:[
  `Alınan − harcanan = 2600 − 2000 = <b>600 kcal</b> fazla.`,
  `Fazla glikoz önce <b>glikojen</b> olarak karaciğer ve kasta depolanır.`,
  `Glikojen depoları dolunca fazlası <b>yağa</b> çevrilip yağ dokusunda depolanır.`,
  `1 g yağ ≈ 9 kcal → 600 ÷ 9 ≈ <b>67 g yağ</b>. Bu her gün tekrarlanırsa kilo artar; dengeli beslenme bu yüzden önemli 🎉`]},
 mc:[
  {q:`Hangisi bir yapım (anabolizma) tepkimesidir?`,o:[`Glikozun solunumla yıkılması`,`Amino asitlerden protein sentezi`,`ATP'nin ADP'ye dönüşmesi`,`Yağın yağ asitlerine ayrılması`],a:1,e:`Küçük moleküllerden büyük molekül yapılıyor, enerji harcanıyor: <b>yapım</b>.`},
  {q:`Hangisi vücuda enerji <b>vermez</b>?`,o:[`Ekmek`,`Zeytinyağı`,`C vitamini`,`Peynir`],a:2,e:`Vitaminler <b>enerji vermez</b>, düzenleyicidir.`},
  {q:`Sinirsel iletim, aktif taşıma ve kas kasılmasının ortak özelliği nedir?`,o:[`ATP harcanması`,`O₂ üretilmesi`,`CO₂ tüketilmesi`,`Işık gerektirmesi`],a:0,e:`Üçü de iş yapar ve <b>ATP harcar</b>.`},
  {q:`Uyurken bile enerji harcamamızın nedeni nedir?`,o:[`Bazal metabolizmanın sürmesi`,`Fotosentez yapmamız`,`Sindirimin tamamen durması`,`ATP'nin depolanması`],a:0,e:`Kalp, solunum ve hücre faaliyetleri hiç durmaz: <b>bazal metabolizma</b>.`}
 ],
 open:[
  {l:"Yazılı tipi",q:`Besinlerden elde edilen enerjinin vücuttaki 4 kullanım alanını örnekle yaz.`,h:`Kas, sinir, pompa, yapım, ısı.`,a:`<b>Kas faaliyeti</b> (kalbin atması), <b>sinirsel iletim</b> (düşünmek), <b>aktif taşıma</b> (zar pompaları), <b>biyosentez</b> (yeni protein yapımı), <b>vücut ısısının</b> korunması.`},
  {l:"Biraz zor",q:`Sürekli hazır ve işlenmiş gıdayla beslenmenin metabolizmaya etkisini değerlendir.`,h:`Enerji fazla, vitamin-lif az.`,a:`Hazır gıdalarda enerji yüksek (şeker, yağ), ama vitamin, mineral ve lif azdır. Fazla enerji <b>yağ olarak depolanır</b>, kilo artar. Vitamin ve mineral eksikliği enzimlerin çalışmasını, dolayısıyla metabolizmayı <b>aksatır</b>. Uzun vadede şeker hastalığı gibi metabolik hastalıkların riski artar.`}
 ],
 note:`Bazal metabolizmam bile seni düşünürken hızlanıyor galiba. Dinlenirken bile aklımdasın. 🏃‍♀️💚`}
];

const KAVRAMLAR=[
 {k:"Işık enerjisi",d:"Güneş'ten gelen enerji. Fotosentezde klorofil tarafından yakalanır.",hue:"sun"},
 {k:"Kimyasal enerji",d:"Moleküllerin bağlarında saklı enerji: glikozda, ATP'de.",hue:"coral"},
 {k:"Pigment",d:"Işığı soğuran renkli molekül: klorofil, karoten, ksantofil, likopen.",hue:"leaf"},
 {k:"Fotoliz",d:"Suyun ışık enerjisiyle parçalanması. Soluduğumuz O₂ buradan çıkar.",hue:"water"},
 {k:"Calvin döngüsü",d:"Stromada CO₂'nin ATP ve NADPH kullanılarak glikoza çevrildiği tepkimeler.",hue:"leaf"},
 {k:"Sindirim",d:"Büyük besin moleküllerinin emilebilecek küçük yapı taşlarına ayrılması.",hue:"berry"},
 {k:"Sindirim sistemi",d:"Ağızdan anüse sindirim kanalı + tükürük bezleri, karaciğer, pankreas.",hue:"teal"},
 {k:"Emilim",d:"Sindirilmiş besinlerin ince bağırsaktaki villuslardan kana geçmesi.",hue:"teal"},
 {k:"Hücresel solunum",d:"Besinlerin hücrede yıkılıp enerjisinin ATP'ye aktarılması.",hue:"coral"},
 {k:"Fermantasyon",d:"Oksijensiz ortamda glikozdan 2 ATP elde edilmesi: etil alkol ya da laktik asit.",hue:"moss"},
 {k:"Elektron taşıma sistemi",d:"Mitokondri iç zarında elektronları O₂'ye ileten, ATP'nin çoğunu üreten sistem.",hue:"plum"},
 {k:"ATP sentezi",d:"ADP + P + enerji → ATP. Fotosentezde, solunumda ve fermantasyonda olur.",hue:"sun"}
];

const BUYUK_TABLO=`<div class="tbl"><table>
<tr><th></th><th>Fotosentez</th><th>Kemosentez</th><th>O₂'li solunum</th><th>Fermantasyon</th></tr>
<tr><td>Enerji kaynağı</td><td>Işık</td><td>İnorganik maddeler</td><td>Besin (glikoz)</td><td>Besin (glikoz)</td></tr>
<tr><td>Kimler</td><td>Bitki, alg, siyanobakteri</td><td>Bazı bakteri, arke</td><td>Çoğu canlı</td><td>Maya, bazı bakteriler, kas, alyuvar</td></tr>
<tr><td>Nerede</td><td>Kloroplast</td><td>Sitoplazma, zar</td><td>Sitoplazma + mitokondri</td><td>Sitoplazma</td></tr>
<tr><td>CO₂</td><td>Kullanır</td><td>Kullanır</td><td>Üretir</td><td>Etil alkolde üretir</td></tr>
<tr><td>O₂</td><td>Üretir</td><td>Üretmez</td><td>Kullanır</td><td>Kullanmaz</td></tr>
<tr><td>Ana ürün</td><td>Glikoz</td><td>Organik besin</td><td>ATP, CO₂, H₂O</td><td>2 ATP + etil alkol/laktik asit</td></tr>
</table></div>`;

const MORAL=[
 "Su iç, bir dal gibi esne, sonra devam. 💧🌿",
 "Mitokondrilerin senin için durmadan çalışıyor. Sen de 5 dakika dinlen, sonra devam. ⚡",
 "Yanlış yapmak deneyin parçası. Bilim insanları da hep yanıldı, sonra buldu. 🔬",
 "Bir soru daha, sonra bir parça çikolata. Glikoz da lazım sonuçta. 🍫",
 "Sen bu sınavı da halledersin, kökün sağlam. 🌱💪",
 "Şu an ATP'lerin beynine koşuyor, benim aklım da sana. 💭",
 "Bir konu bitince bana yaz; seranda bir yaprak daha açtın demektir. 🍃",
 "Çalışırken bile çok güzelsin, biliyor musun? 💚"
];
