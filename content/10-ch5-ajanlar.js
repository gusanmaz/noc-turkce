registerChapter({
  id: "ch5",
  title: "5. Otonom ajanlar",
  short: "5. Ajanlar",
  icon: "🐟",
  original: "https://natureofcode.com/autonomous-agents/",
  originalCode:
    "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering",
  html: `
    <p style="font-style:italic;color:var(--muted);">“Hayat bir yolculuktur, varış noktası değil.” — Ralph Waldo Emerson</p>

    ${N.img(
      "05_steering",
      "05_steering_1.jpg",
      "Mo’i balıkları (Polydactylus sexfilis), ABD Ulusal Okyanus ve Atmosfer Dairesi. Hawaii’de “kral balığı”: sürü halinde yüzerken her biri komşusunu hem iter hem izler. Kitap otonom ajanı bu kolektif dansla açar."
    )}

    <p>Şimdiye kadar tuvaldeki şekiller cansızdı: rüzgâr, yerçekimi, sürtünme onları itince savruluyorlardı. Bu kitap kodun doğasını arıyor. Ya o şekiller kendi kuralıyla yaşasa? Kendi “isteği” olsa: alevdeki güve gibi hedefe gitmek, küçük balık gibi köpekbalığından kaçmak. Bu bölümün konusu budur. Cansız nesne ile <strong>otonom ajan</strong> burada ayrılır.</p>

    ${N.note(
      "Bu bölümün çıktısı",
      `<ul>
        <li>İçeriden gelen kuvvet: <code>Vehicle</code> (araç) — konum, hız, ivme aynı; yeni şey <em>istenilen hız</em></li>
        <li>Reynolds formülü: yönlendirme = istenen − şu anki hız; <code>maxspeed</code> ve <code>maxforce</code></li>
        <li>Seek (ara) hedefi geçer; arrive (var) yavaşlar — ikisi de tasarım</li>
        <li>Üçgeni hıza çevirmek: <code>translate</code> + <code>rotate(heading())</code> (radyan tuzağı)</li>
        <li>Akış alanı, yol takibi (nokta çarpım / izdüşüm), ayrılma, sürü</li>
        <li>N×N komşu taraması neden yavaşlar; ızgara (bin) ve quadtree</li>
      </ul>`
    )}

    <h2>İçeriden gelen kuvvetler</h2>

    <p>Otonom ajan, ortamında nasıl davranacağına <em>kendi</em> karar veren bir varlıktır. Komutan yok, küresel plan yok. Bu kitapta davranmak çoğunlukla hareket etmektir. Bölüm 2’deki çekim, iki cismi dışarıdan birbirine yapıştırırdı. Şimdi cismin kendisi “şu noktaya gitmek istiyorum” der; o istek yine bir kuvvettir. Fark kaynağındadır: içeriden gelir.</p>

    <p>Üç parça, örnekler boyunca duracak:</p>
    <ul>
      <li><strong>Sınırlı algı.</strong> Ajan hem dışarıyı (hedef, duvar, komşu) hem kendini (konum, hız) bilir — ama her şeyi değil. Tuvaldeki her pikseli gören daire de yazılabilir, yalnız 15 piksel içini koklayan da. Sınır, simülasyonu “doğal” hissettirir: böcek odanın öbür ucundaki şekeri bilmez. Gerçek böceği ölçmek zorunda değilsiniz; bir mesafe seçip denersiniz.</li>
      <li><strong>Bilgi → eylem.</strong> Eylem burada kuvvettir. Köpekbalığı üzerine geliyorsa eylem, ters yöne güçlü bir oktur.</li>
      <li><strong>Lider yok.</strong> Bazı oyunlar komutan ister; o zaman yazın. Bu bölümün sonundaki sürü ise liderden doğmaz: her kuş yalnız yakındakine bakar, kalabalık bir desen çıkar. Buna <strong>karmaşık sistem</strong> denir.</li>
    </ul>
    <p>Karınca kolonisi, termit yuvası da ajan sistemleridir. Mitchel Resnick’in <em>Turtles, Termites, and Traffic Jams</em> kitabı oraya gider. Biz ilk dört bölümün tuğlasına dönüyoruz: vektör ve kuvvet. Kahraman sınıf bir kez daha isim değiştirir: <code>Walker</code>, <code>Mover</code>, <code>Particle</code>… şimdi <code>Vehicle</code>.</p>

    <h2>Araçlar ve yönlendirme</h2>

    <p>1980’lerin sonunda Craig Reynolds, animasyon karakterleri için <strong>steering</strong> (yönlendirme) davranışları yazdı: kaç, gezin, var, kovala, savuş. 1999 tarihli “Steering Behaviors for Autonomous Characters” yazısında ajanına <em>vehicle</em> (araç) der. Sınıf adı da o olsun:</p>
    <pre><code>class Vehicle {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }
}</code></pre>
    <p>Hareket hâlâ Bölüm 2 şelalesi: ivme hıza, hız konuma. Tek aracın direksiyonu bu yüzden kısa. Bir sürü araç aynı kurala bakınca karmaşa çıkar. Reynolds’un boid sürü modeli Örnek 5.11’de.</p>

    ${N.note(
      "Neden “araç”?",
      `<p>Valentino Braitenberg, <em>Vehicles: Experiments in Synthetic Psychology</em> (1986) kitabında içi çok basit makineler uydurur: korku, saldırganlık, aşk gibi hallerin bu kadar az parçadan çıkabileceğini savunur. Reynolds ondan esinlenir; biz Reynolds’tan.</p>`
    )}

    <p>Reynolds <em>idealleştirilmiş</em> araçtan söz eder: motor nasıl tork üretir diye mühendislik yok; araç “çalışıyor” varsayılır, kurallara cevap verir. Üç katman:</p>
    <ol>
      <li><strong>Eylem seçimi.</strong> Hedef (veya birkaç hedef) var; ortam bakılır, eylem seçilir. “Zombi geliyor, beynim yenmesin, kaçıyorum.” Hedef beyni korumak, eylem flee (kaç). Seek, engelden sakın, yol takip et — hepsi bu katmanda birer istek.</li>
      <li><strong>Yönlendirme.</strong> Seçilen eylem bir sonraki hamleye, yani kuvvete çevrilir. Reynolds’un formülü bölüm boyunca aynı kalır: <strong>yönlendirme kuvveti = istenen hız − şu anki hız</strong>.</li>
      <li><strong>Yürüme biçimi (locomotion).</strong> Zombiden kaçarken “sol ayak, sağ ayak.” Tuvalde üçgenin ayağı yoktur; hareket zaten illüzyon. Yine de tekerlek, kürek, bacak çizmek karaktere iş katar. Bizim örnekler çıplak üçgen kalacak; ödeviniz onları giydirmek olabilir.</li>
    </ol>
    <p>Asıl iş birinci katmandır: elemanlarınız kim, ne ister? Seek, flee, yol, akış alanı, komşularla sürü — bunları ezberleyip her projeye yapıştırmayın. Kalıp şudur: istenen hızı bir vektör olarak söyleyebiliyorsanız, kendi davranışınızı yazmışsınızdır. Braitenberg gibi soyut da düşünebilirsiniz: hedefin adı “aşk” olsa hangi ok doğar?</p>
    <p>Tek eylemle de yetinmeyin. İlk örnek fareyi arar. İleride aynı araca birkaç istek birden binecek; ağırlıklarla karıştırılacak. Gelen örnekler yapboz parçası: tek başlarına kopyalanacak reçete değil.</p>

    <h3>Yönlendirme kuvveti</h3>

    <p>Araç bir hızla gidiyor ve bir hedefi arıyor. Reynolds’un böceği çileğe koşsun (Şekil 5.1).</p>
    ${N.img(
      "05_steering",
      "05_steering_2.png",
      "Şekil 5.1: Hızı olan bir araç ve bir hedef (çilek)."
    )}
    <p>Bölüm 2 refleksi: hedefi çekici yap, yerçekimi gibi çek. Çalışır. Kavram olarak istediğimiz bu değil. Dışarıdan itilen taş değil; kendi durumunu (hızını, baktığı yönü) ve ortamı (hedefin yerini) okuyup direksiyon kıran bir şey istiyoruz. “Nereye gitmek istiyorum?” ile “şu an nereye gidiyorum?” arasındaki fark, uygulanacak kuvvettir. Reynolds bunu bir satırda yazar:</p>
    ${N.math(
      "steer = desired − velocity",
      "İstenen hız vektöründen şu anki hız vektörü çıkarılır. p5.js’te <code>p5.Vector.sub(desired, velocity)</code> yeni bir vektör döndürür; <code>desired</code> ve <code>velocity</code> bozulmaz. Bu sonuç <code>applyForce</code> ile ivmeye eklenir."
    )}
    <p>Şu anki hız zaten <code>this.velocity</code>. İstenen hızı hesaplamak gerekir. Hedef “şu noktaya git” ise istenen ok, araçtan hedefe gider (Şekil 5.2).</p>
    ${N.img(
      "05_steering",
      "05_steering_3.png",
      "Şekil 5.2: İstenen hız, konumdan hedefe bakar. (Çizimde ok kısaltılmıştır; aslında merkezden merkeze gider.)"
    )}
    <pre><code>let desired = p5.Vector.sub(target, this.position);</code></pre>
    <p>Tuval büyükse hedef binlerce piksel ötede olabilir. Araç bir karede ışınlanmak “ister” — animasyon için işe yaramaz. İsteği yeniden söyleyelim:</p>
    <p><em>Araç, hedefe doğru, elindeki en yüksek hızla gitmek ister.</em></p>
    <p>Yön hedefe, büyüklük <code>maxspeed</code> (Şekil 5.3). Bölüm 1’de hız tavanı vardı; 2 ve 3’te sürtünme veya zıt kuvvet bazen tavanı unutturuyordu. Burada <code>maxspeed</code> karakterin kendisidir: her örnekte durur.</p>
    ${N.img(
      "05_steering",
      "05_steering_4.png",
      "Şekil 5.3: İstenen hızın uzunluğu maxspeed."
    )}
    <pre><code>let desired = p5.Vector.sub(target, this.position);
desired.setMag(this.maxspeed);</code></pre>
    <p><code>seek(target)</code> bu iki satırı formüle bağlar, sonucu <code>applyForce</code>’a verir (Bölüm 2 temeli).</p>
    ${N.img(
      "05_steering",
      "05_steering_5.png",
      "Şekil 5.4: Yönlendirme kuvveti = istenen hız eksi şu anki hız."
    )}
    <p>Yerçekimi her zaman cisme doğru bakar; cismin hızı formüle girmez. Burada araç kendi hızını bilir ve hatayı düzeltir. Aynı hedefe giden iki araç, hızları farklıysa farklı kuvvet görür. “Canlı” hissi buradan gelir: ajan sınırlı da olsa kendini algılar.</p>
    <p>Bir şey eksik. Bu bir yarış arabası mı, duraklarda süzülen otobüs mü? Direksiyonun ne kadar sert kırılacağı <code>maxforce</code> ile kesilir: <code>steer.limit(this.maxforce)</code>. Amaç hedefe en kısa sürede varmak değil — o zaman <code>position = target</code> yazıp ışınlanırdınız. Reynolds’un diliyle: hayat gibi, doğaçlama gibi görünen bir yol. Büyük <code>maxforce</code> keskin döner; küçük olanı yolunu yayar (Şekil 5.5). Biri “daha doğru” değildir. Enerji adlı bir özellik uydurup yorulunca <code>maxforce</code>’u düşürmek de sizin kuralınız olur.</p>
    ${N.img(
      "05_steering",
      "05_steering_6.png",
      "Şekil 5.5: Solda daha büyük maxforce (keskin yol), sağda daha küçük (yayvan yol)."
    )}

    <h3>Örnek 5.1: Hedefi aramak (seek)</h3>
    <p>Üçgen fareyi tam gaz arar. Hedefin üstünden geçmesi bozulma değil: her kare “mümkün olan en hızlı” demeye devam eder. Karşılaştırma biraz aşağıda, arrive ile yan yana.</p>
    ${N.editor("ex51")}
    ${N.tryit([
      { do: "maxspeed değerini 8 yerine 2 yapın.", expect: "Üçgen süzülür; yine de hedefin içinden geçer, çünkü setMag hâlâ tavana çekiyor." },
      { do: "maxforce değerini 0.2 yerine 0.02 yapın.", expect: "Dönüş geç gelir; geniş kavis, hedefi daha da geç geçiş." },
    ])}

    <h3>Üçgen neden o yöne bakıyor?</h3>
    <p>Önceki bölümlerde daire vardı; dairenin “burnu” yoktur. Burada araç bir kâğıt balık: varsayılan hali <em>sağa</em> bakar. Köşeler yerel eksende yazılır: burun <code>(2r, 0)</code>, yani +x. Tuvale ham haliyle çizseniz üçgen hep sağa dönük durur; hız sola gitse bile burun ters tarafta kalır. Önce kâğıdı aracın olduğu piksele götürürsünüz (<code>translate</code>), sonra o noktada çevirirsiniz (<code>rotate</code>).</p>
    <p>Çevirme açısı hız okunun yerle yaptığı açıdır. p5.js bunu <code>velocity.heading()</code> diye verir: içeride <code>atan2(y, x)</code>. <code>atan2</code> iki kenarı (önce y, sonra x — sıra tuzağı) alıp radyan cinsinden açı döndürür. <code>rotate</code> de radyan bekler. İkisi aynı cetveldedir; <code>heading()</code> çıktısını olduğu gibi <code>rotate</code>’e verin.</p>
    ${N.warn(
      "Tuzak: rotate(90)",
      `<p><code>rotate(90)</code> “90 derece” değildir. p5.js varsayılanı radyandır; 90 radyan yaklaşık 14 tur döner, üçgen kaybolmuş gibi durur. <code>heading()</code> zaten radyan verir — bir daha 90 ile çarpmayın. Derece istiyorsanız <code>angleMode(DEGREES)</code> açın; o zaman hem <code>heading</code> hem <code>rotate</code> dereceye döner. Karışık cetvel: birini derece sanıp diğerini radyan bırakmak.</p>
      <p><code>translate</code> kalemi değil orijini kaydırır. <code>rotate</code> o yeni orijinin etrafında döner. <code>push</code> / <code>pop</code> bu kaydı fotoğraflar; pop’tan sonra tuvalin (0, 0)’ı yine sol üsttür. Translate’siz <code>rotate(heading())</code> üçgeni sol üst köşe etrafında savurur.</p>`
    )}
    <p>Soldaki gri üçgen: aynı köşeler, <code>rotate</code> yok — burun hep sağa. Siyah: <code>translate</code> + <code>rotate(heading())</code>. Fare yönü hızdır; siyah burun o oku izler, gri izlemez.</p>
    ${N.editor("ucgenDon")}
    ${N.tryit([
      { do: "Siyah üçgende rotate(vel.heading()) satırını silin.", expect: "Siyah da griye biner; ikisi de sağa bakar." },
      { do: "rotate(vel.heading()) yerine rotate(90) yazın.", expect: "Üçgen ~14 tur döner; burun fareyle ilişkisini kaybeder." },
    ])}
    ${N.quiz(
      "show() içinde translate olmadan rotate(heading()) ne yapar?",
      [
        "Üçgen aracın konumunda, hıza bakar",
        "Üçgen sol üst (0, 0) etrafında döner",
        "Üçgen hiç çizilmez",
      ],
      1,
      "rotate her zaman o anki orijinin etrafındadır. translate yoksa orijin sol üstte kalır."
    )}

    ${N.note(
      "Alıştırmalar 5.1–5.3 (orijinal)",
      `<p>5.1: Flee (kaç) — seek ile aynı istenen hız, ters yön. 5.2: maxforce ve maxspeed sabit kalmasın; ortama göre değişsin. 5.3: Hareket eden hedefi kovala (pursuit): istenen ok şimdiki konuma değil, hızdan kestirdiğiniz geleceğe baksın. Çözüm Coding Train “Pursue &amp; Evade” videosunda.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-51" target="_blank" rel="noopener">5.1</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-52" target="_blank" rel="noopener">5.2</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-53" target="_blank" rel="noopener">5.3</a></p>`
    )}

    <h3>Varma (arrive)</h3>

    <p>Seek bir süre oynanınca soru gelir: yaklaşırken yavaşlasa? Önce neden geçtiğini söyleyelim. Seek’in beyni her kare aynı cümleyi kurar: “Hedefe mümkün olan en hızlı git.” Mesafe 400 piksel de olsa 4 piksel de olsa istenen uzunluk <code>maxspeed</code>. Yakına gelince duracak aklı yoktur; hedefi geçer, dönüp yine tam gaz (Şekil 5.6, üst).</p>
    ${N.img(
      "05_steering",
      "05_steering_7.png",
      "Şekil 5.6: Üstte seek — istenen hız hep tavanda, hedefi geçer. Altta mesafe ile ölçeklenmiş istenen hız. (Böcek yerine bundan sonra üçgen.)"
    )}
    <p>Kimi sahne tam gaz ister (oyuncağına koşan köpek). Kimi sahne yavaşlar: otopark, çiçeğe konan arı. O zaman mesafe cümleye girer: uzaktayken tam gaz, yaklaşınca yavaş, vardım deyince dur.</p>
    <p><code>seek</code> içinde uzunluğu tavan yapan satır <code>desired.setMag(this.maxspeed)</code>’tir. Bunu “mesafenin yarısı” yapmak fikri gösterir ama 10 pikselde hız 5 hâlâ büyüktür. Reynolds’un hali: hedefin etrafında bir daire (örnekte 100 piksel). Dışında tavan hız. İçinde, kenardaki tavandan merkezdeki sıfıra <code>map</code> ile inilir (Şekil 5.9).</p>
    ${N.img(
      "05_steering",
      "05_steering_8.png",
      "Şekil 5.7: Seek — istenen hızın boyu mesafeye bakmaz, hep maxspeed."
    )}
    ${N.img(
      "05_steering",
      "05_steering_9.png",
      "Şekil 5.8: İstenen boy mesafenin yarısı; en soldaki yine tavanla kesilmiş."
    )}
    ${N.img(
      "05_steering",
      "05_steering_10.png",
      "Şekil 5.9: Daire dışında tavan; daire içinde hedefe yaklaştıkça istenen hız küçülür."
    )}
    ${N.math(
      "m = map(d, 0, 100, 0, maxspeed)",
      "p5.js <code>map(d, 0, 100, 0, this.maxspeed)</code>: d (hedefe piksel) 0 iken sonuç 0, d 100 iken sonuç maxspeed, arası orantılı. d daire dışındaysa bu satır çalışmaz; <code>setMag(this.maxspeed)</code> kalır."
    )}

    <h3>Örnek 5.2: Hedefe varmak (arrive)</h3>
    <p>Gri daire fare. Üçgen içine girince yavaşlar; tam üstünde durur. Seek’teki “geçiş” burada yok — çünkü istek mesafeyi okur.</p>
    ${N.editor("ex52")}
    ${N.tryit([
      { do: "if (d < 100) eşiğini 40 yapın.", expect: "Yavaşlama daha geç başlar; daireye tam gaz girer, yine de durur." },
      { do: "map satırını silip her zaman setMag(this.maxspeed) bırakın.", expect: "Arrive seek’e döner; hedefi geçer." },
    ])}

    <p>İkisini bir tuvalde görün. Üstteki seek, alttaki arrive; hedef aynı fare. Seek etiketi hedefi geçer — bu bir hata mesajı değil, kuralın sonucu. Arrive 100 piksellik dairede yavaşlar. Köpek ile park eden araba.</p>
    ${N.editor("seekArrive")}
    ${N.quiz(
      "Seek hedefi geçiyorsa kod bozuk mudur?",
      [
        "Evet, setMag yanlış",
        "Hayır: her kare tam gaz istemek geçmeyi üretir; arrive mesafeyi okur",
        "Yalnızca maxforce küçükse bozuktur",
      ],
      1,
      "Seek’in cümlesi mesafeyi umursamaz. Geçmek o cümlenin tasarımıdır."
    )}

    <p>Arrive, ajanın ortamı <em>ve kendini</em> okuduğunun net örneği. Bölüm 2’deki gezegen çekimi yaşadığını “bilmez”; çita kovaladığını bilir. Kuvvetin yönü yalnız hedefe bakmaz: istenen hıza göre şu anki hızın <em>hatası</em>dır. “Bu yönde bu hızda olmalıydım, oysa başka yönde gidiyorum.” Bazen hata, hedeften <em>uzaklaşan</em> bir oktur (Şekil 5.10): araç hedefe fazla hızlıysa fren, ters yöne bakabilir. Yerçekiminde hedefi iten kuvvet görmezdiniz.</p>
    ${N.img(
      "05_steering",
      "05_steering_11.png",
      "Şekil 5.10: Hedefe doğru fazla hızlı gidince yönlendirme kuvveti hedeften uzağa bakabilir — fren."
    )}

    <h3>Kendi davranışınız</h3>

    <p>Seek ve arrive tek vektöre iner: istenen hız. Reynolds’un listesindeki her davranış aynı kalıptır. Akış alanı, yol, sürü gelecek. Bunlar reçete değil; istenen hızı uydurduğunuz anda yeni davranış vardır.</p>
    <p>Reynolds gezinmeyi (wander) şöyle tarif eder: her kare rastgele direksiyon değil, bir karedeki yön bir sonrakine bağlı kalsın. Yoksa titreyen bir sinek olur. Kestirdiği gelecek noktanın etrafına bir daire çizer; dairenin çevresinde dolaşan rastgele nokta o anki hedeftir (Şekil 5.11). Kulağa keyfi gelir — evet, uydurulmuştur. Rastgeleliği dairenin üzerine kilitleyince jitter azalır. Siz başka bir masal da uydurabilirsiniz.</p>
    ${N.img(
      "05_steering",
      "05_steering_12.png",
      "Şekil 5.11: Wander — aracın önüne yansıtılmış dairenin çevresinde gezen hedefi seek etmek."
    )}
    ${N.note(
      "Alıştırma 5.4 (orijinal)",
      `<p>Reynolds’un wander’ını yazın. Daire üzerindeki hedef için kutupsal koordinat (<code>cos</code> / <code>sin</code> açı).</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-54" target="_blank" rel="noopener">Exercise 5.4</a></p>`
    )}

    <p>Başka bir uydurma: duvarın içinde kal. Kural: kenara <code>offset</code> pikselden fazla yaklaşınca, o kenardan <em>uzağa</em> tam gaz gitmek iste (Şekil 5.12). Tuval kenarı duvar, offset 25.</p>
    ${N.img(
      "05_steering",
      "05_steering_13.png",
      "Şekil 5.12: Kenara fazla yaklaşınca istenen hız duvardan uzağa bakar."
    )}

    <h3>Örnek 5.3: Duvarların içinde kal</h3>
    <p>İnce dikdörtgen “güvenli” bölge. Tıklayınca çizgi açılıp kapanır. <code>desired</code> başta <code>null</code>: kenardan uzaktayken kuvvet yok. Sıfır vektör koysaydınız “durmak istiyorum” olurdu; formül aracı yavaşlatırdı. <code>null</code> “bu karede direksiyon yok” demektir.</p>
    ${N.editor("ex53")}
    ${N.tryit([
      { do: "offset değerini 25 yerine 80 yapın.", expect: "Güvenli dikdörtgen küçülür; üçgen daha içeride döner." },
      { do: "desired = null yerine desired = createVector(0, 0) yazın.", expect: "Ortada da fren: araç durmaya çalışır." },
    ])}
    ${N.note(
      "Alıştırma 5.5 (orijinal)",
      `<p>Kendi keyfi kuralınızla bir istenen hız uydurun.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-55" target="_blank" rel="noopener">Exercise 5.5</a></p>`
    )}

    <h2>Akış alanları</h2>

    <p>Tuvali ızgaraya bölün. Her hücrede bir ok durur — bir vektör. Araç “altımdaki ok nedir? İstenen hızım o” der (Şekil 5.13). Reynolds gelecek konuma bakar; biz şimdiki hücreyi okuruz.</p>
    ${N.img(
      "05_steering",
      "05_steering_14.png",
      "Şekil 5.13: Her hücrede birim ok olan 2B ızgara."
    )}
    <p>Izgara, iç içe diziyle tutulur: sütun i, satır j. (İç içe dizi yeni olabilir: her sütun bir kutu sırası, her kutuda bir <code>p5.Vector</code>. Coding Train’in “2D Arrays” videosu aynı resmi çizer.)</p>
    <p>200×200 tuvalde her piksele ok 40.000 vektördür; gerekmez. Her 10 pikselde bir ok 20×20 = 400 yeter. <code>resolution</code> hücre boyu (piksel). Sütun sayısı <code>floor(width / resolution)</code>, satır sayısı yükseklikle aynı hesap.</p>
    <p>Okları nasıl doldurursunuz? Hepsi sağa: <code>createVector(1, 0)</code> (Şekil 5.14). Rastgele: <code>p5.Vector.random2D()</code> (Şekil 5.15). Perlin: gürültüyü açıya map edip <code>p5.Vector.fromAngle(angle)</code> (Şekil 5.16). Perlin çan eğrisine benzediği için açılar π civarına yığılabilir; kitap bunu 0…4π aralığıyla gevşetir. “Doğru” alan yoktur: rüzgâr mı, dere mi, siz seçersiniz.</p>
    ${N.img(
      "05_steering",
      "05_steering_15.png",
      "Şekil 5.14: Bütün oklar sağa."
    )}
    ${N.img(
      "05_steering",
      "05_steering_16.png",
      "Şekil 5.15: Rastgele yönler."
    )}
    ${N.img(
      "05_steering",
      "05_steering_17.png",
      "Şekil 5.16: Perlin ile üretilmiş alan."
    )}
    ${N.note(
      "Alıştırma 5.6 (orijinal)",
      `<p>Oklar tuval merkezinin etrafında dönsün. Kitaptaki iskele: hücre konumundan merkeze vektör, sonra <code>rotate</code>.</p>
      ${N.img("05_steering", "05_steering_18.png", "Alıştırma 5.6: merkez etrafında dönen alan.")}
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-56" target="_blank" rel="noopener">Exercise 5.6</a></p>`
    )}
    <p>Araç konumunu hücreye çevirir: x’i ve y’yi çözünürlüğe böl, <code>floor</code>. (100, 50), çözünürlük 10 ise sütun 10, satır 5. Tuval dışına çıkabilir; dizin patlamasın diye <code>constrain(..., 0, cols - 1)</code>. <code>lookup</code> asıl oku değil <code>copy()</code> ile kopyasını verir: araç <code>setMag</code> ile kopyayı bozar, tarladaki ok kalır.</p>

    <h3>Örnek 5.4: Akış alanını izlemek</h3>
    <p>Tıklayınca Perlin yeniden ekilir, yeni rüzgâr. Boşluk (tuvale tıklayıp) okları açıp kapar. <code>follow</code> hücredeki oku tavana çeker, sonra yine istenen eksi hız.</p>
    ${N.editor("ex54")}
    ${N.tryit([
      { do: "new FlowField(20) yerine (40) yazın.", expect: "Daha kaba ızgara; dönüşler köşeli." },
    ])}
    ${N.note(
      "Alıştırmalar 5.7–5.8 (orijinal)",
      `<p>5.7: Oklar zamanla değişsin (Perlin’in üçüncü ekseni). 5.8: Alanı bir resimden üretin; koyudan açığa (veya tersi) aksın.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-57" target="_blank" rel="noopener">5.7</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-58" target="_blank" rel="noopener">5.8</a></p>`
    )}

    <h2>Yol takibi</h2>

    <p>Burada yol <em>takibi</em> var, yol <em>bulma</em> yok. Pathfinding labirentte en kısa yolu arar. Path following’de yol zaten çizilidir; araç şeritte kalmaya çalışır.</p>
    <p>Algoritmadan önce Bölüm 1’de atlanan bir çarpma: <strong>nokta çarpım</strong> (dot product). Yolun üzerine gölge düşürmek (skaler izdüşüm) buna yaslanır.</p>

    <h3>Nokta çarpım</h3>

    <p>Toplama, çıkarma, bir oku sayıyla büyütme vardı (Şekil 5.17). “İki oku çarp” ise tek iş değildir. Nokta çarpım onlardan biri: girdi iki ok, çıktı <em>tek sayı</em>. Yeni ok doğmaz.</p>
    ${N.img(
      "05_steering",
      "05_steering_19.png",
      "Şekil 5.17: Vektör toplama ve skalerle çarpma — hatırlatma."
    )}
    <p>Günlük resim: iki kişi aynı koridorda yürüyor. Biri tam ileri, diğeri hafif sağa. “Ne kadar aynı yöne bakıyorlar?” sorusu nokta çarpımdır. Omuz omuza aynı yöne gidiyorlarsa sayı büyük ve artı; biri diğerine dik bakıyorsa ortak yön yoktur, sayı sıfıra iner; zıt yürüyorlarsa eksi. Kod bunu, iki okun x’lerini çarpıp y’lerini çarpıp toplamakla ölçer.</p>
    ${N.math(
      "A · B = A<sub>x</sub> × B<sub>x</sub> + A<sub>y</sub> × B<sub>y</sub>",
      "Eşleşen bileşenleri çarpın, toplayın. Sonuç bir sayıdır. p5.js: <code>a.dot(b)</code> — <code>this.x * v.x + this.y * v.y</code> (üçüncü bileşen z varsa o da eklenir; 2B’de z sıfırdır)."
    )}
    <p>Örnek: A = (−3, 5), B = (10, 1) ise (−3)×10 + 5×1 = −25. p5.js’te <code>a.dot(b)</code> −25 döner. Bu sayıyı <code>line</code> ile çizmeye kalkmayın: ok değil, skaler. Çizerseniz x eksenine rastgele bir uzunluk koymuş olursunuz; açı kaybolur.</p>
    <p>Neden yol takibi umursar: “Aracın ilerideki noktası asfaltın neresine düşer?” Şeridin üzerine dik inen gölge, izdüşümdür. Gölgenin boyu nokta çarpımdan gelir. Yanlış yazarsanız (sayıyı ok sanmak, veya A ile B’yi karıştırmak) hedef şeridin üstünde durmaz; araç asfaltı kaçırır.</p>
    <p>Aynı sayı, iki ok arasındaki açıyı da taşır. İki uzunluk ve aradaki θ için nokta çarpım aynı zamanda |A| × |B| × cos(θ) değeridir. θ’yi istiyorsanız sayıyı iki uzunluğun çarpımına bölüp <code>acos</code> alırsınız. p5.js bunu <code>p5.Vector.angleBetween(a, b)</code> diye paketler; sonuç radyan.</p>
    ${N.img(
      "05_steering",
      "05_steering_20.png",
      "Şekil 5.18: A ve B arasındaki θ açısı. Bileşenler belli, açı nokta çarpımdan çıkar."
    )}
    ${N.math(
      "θ = acos((A · B) / (|A| × |B|))",
      "Pay <code>a.dot(b)</code>, payda <code>a.mag() * b.mag()</code>. p5.js <code>acos</code> radyan döndürür; ekranda derece için <code>degrees(θ)</code>. İki birim vektörde payda 1’dir, nokta çarpım doğrudan cos(θ) olur. İki ok dikse nokta çarpım 0’dır."
    )}
    <p>Fare kırmızı oku (B) gezdirir. Mavi A sabit, sağa. Siyah kalın çizgi B’nin A üzerindeki gölgesi. Sayı artıysa dar açı, sıfıra yakınsa dik, eksiyle zıt. Alıştırma 5.9’un sınıf hali: açıyı tuvalde okuyun, formülü ezberlemek zorunda değilsiniz.</p>
    ${N.editor("noktaCarpim")}
    ${N.tryit([
      { do: "Farenin okunu mavi oka dik tutun.", expect: "A · B ≈ 0, gölge kısalır, yazı dikeye yakın der." },
      { do: "Kırmızı oku maviyle ters tutun.", expect: "A · B eksi; gölge sola düşer." },
    ])}
    ${N.quiz(
      "a.dot(b) ne döndürür?",
      ["Yeni bir p5.Vector", "Tek bir sayı (skaler)", "İki okun ortasındaki nokta"],
      1,
      "Nokta çarpım skalerdir. Çizilecek bir ok üretmez."
    )}
    ${N.note(
      "Alıştırma 5.9 (orijinal)",
      `<p>İki vektör arasındaki açıyı gösteren bir sketch. (Yukarıdaki tuval bunu fareyle yapar.)</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-59" target="_blank" rel="noopener">Exercise 5.9</a></p>`
    )}

    <h3>Basit yol takibi</h3>

    <p>Şekil 5.19 malzeme listesi: yol, araç, gelecekteki konum, yola dik normal, hedef. Yol, bağlı noktalar dizisidir (Şekil 5.20). En yalını iki nokta ve bir yarıçap (Şekil 5.21). Yarıçap şerit genişliği: dar şerit sıkı takip, geniş şerit savrulmaya izin.</p>
    ${N.img(
      "05_steering",
      "05_steering_21.png",
      "Şekil 5.19: Yol, araç, gelecek konum, normal, hedef."
    )}
    ${N.img(
      "05_steering",
      "05_steering_22.png",
      "Şekil 5.20: Yol = bağlı noktalar."
    )}
    ${N.img(
      "05_steering",
      "05_steering_23.png",
      "Şekil 5.21: Baş, son ve yarıçap."
    )}

    <h3>Örnek 5.5: Bir Path nesnesi</h3>
    <p>Kalın gri şerit yarıçap, ince siyah orta çizgi. Araç henüz yok; yolun kendisi bir sınıftır.</p>
    ${N.editor("ex55")}

    <p>Araç şeridin dışında bir hızla gidiyor (Şekil 5.22). Adım 1: hızın yönünde 25 piksel ileriyi tahmin et. Adım 2: o noktadan yola inen dik ayağı (normal) bul. Adım 3: normal şeridin dışındaysa, yol üzerinde biraz ileride bir hedef seek et.</p>
    ${N.img(
      "05_steering",
      "05_steering_24.png",
      "Şekil 5.22: Şeritten uzaklaşan araç."
    )}
    ${N.img(
      "05_steering",
      "05_steering_25.png",
      "Şekil 5.23: Normal: gelecek noktadan yola dik inen ayak."
    )}
    <p>A: yolun başından gelecek noktaya. B: yolun başından sonuna. Dik üçgende ayağın yol üzerindeki uzaklığı |A| × cos(θ). θ, A ile B arasındaki açı — nokta çarpımın işi. B’yi birim vektör yaparsanız (|B| = 1) o uzaklık tam <code>A · B</code> olur: <code>b.normalize(); b.setMag(a.dot(b));</code> Sonra normal = yolun başı + bu kısaltılmış B. Buna <strong>skaler izdüşüm</strong> denir: A’yı B’nin üzerine gölgelemek (Şekil 5.25).</p>
    ${N.img(
      "05_steering",
      "05_steering_26.png",
      "Şekil 5.24: Başlangıçtan normale uzaklık |A| cos(θ)."
    )}
    ${N.img(
      "05_steering",
      "05_steering_27.png",
      "Şekil 5.25: A’nın B üzerindeki skaler izdüşümü."
    )}
    ${N.img(
      "05_steering",
      "05_steering_28.png",
      "Şekil 5.26: Gelecek şeritteyse dokunma; dışındaysa hedefe seek."
    )}
    ${N.img(
      "05_steering",
      "05_steering_29.png",
      "Şekil 5.27: Hedef, normalin yol boyunca ~25 piksel ilerisi (sayı keyfi)."
    )}

    <h3>Örnek 5.6: Düz şeridi izlemek</h3>
    <p>İki araç, farklı maxspeed / maxforce. Boşluk hata ayıklama çizgilerini açar: gelecek nokta, normal, kırmızı hedef. Şeritteyken seek susar.</p>
    ${N.editor("ex56")}
    ${N.img(
      "05_steering",
      "05_steering_30.png",
      "Şekil 5.28: getNormalPoint(position, a, b): a→nokta ve a→b, sonra izdüşüm."
    )}

    <h3>Birden fazla dilimli yol</h3>

    <p>Kıvrım çizmek güzel; hesap için düz dilimler yeter (Şekil 5.29–5.30). Her dilimin bir normali vardır. Reynolds: (a) şeridin üstünde olan, (b) en yakın olanı seç (Şekil 5.31). Sonsuz doğru her zaman ayak kabul eder; sonlu dilim dışına düşen ayağı ele. Örnek soldan sağa gittiği için “normal.x, a.x ile b.x arasında mı?” yeter. Değilse o dilimin b ucunu ayak say.</p>
    ${N.img(
      "05_steering",
      "05_steering_31.png",
      "Şekil 5.29: Kıvrımlı yol."
    )}
    ${N.img(
      "05_steering",
      "05_steering_32.png",
      "Şekil 5.30: Aynı yol, düz dilimlerle yaklaştırılmış."
    )}
    ${N.img(
      "05_steering",
      "05_steering_33.png",
      "Şekil 5.31: Dilimlerin normalleri; en yakın ve şerit üstündeki seçilir."
    )}

    <h3>Örnek 5.7: Dilimli yol</h3>
    <p>Yalnız geometri. <code>addPoint</code> ile köşeler eklenir.</p>
    ${N.editor("ex57")}
    ${N.note(
      "Alıştırma 5.10 (orijinal)",
      `<p>Ayağın dilimde olup olmadığını daha genel sınayın: normal–a ve normal–b mesafelerinin toplamı dilim uzunluğundan büyükse ayak dışarıdadır.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-510" target="_blank" rel="noopener">Exercise 5.10</a></p>`
    )}
    <p>En yakını seçmek: rekoru <code>Infinity</code> ile başlatın. JavaScript’te <code>Infinity</code> her gerçek mesafeden büyüktür; ilk aday her zaman rekoru kırar.</p>

    <h3>Örnek 5.8: Dilimli yolu izlemek</h3>
    <p>Tıklayınca yeni rastgele yol. Boşluk hata ayıklama. 25 (veya koddaki 10) piksel “hedefi ayağın ilerisine koy” sayısı keyfidir; Reynolds bunu hıza ve şeride uzaklığa bağlamayı önerir.</p>
    ${N.editor("ex58")}
    ${N.note(
      "Alıştırma 5.11 (orijinal)",
      `<p>Zamanla değişen bir yol. Noktaların kendisi steering yapsın mı?</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-511" target="_blank" rel="noopener">Exercise 5.11</a></p>`
    )}

    <h2>Karmaşık sistemler</h2>

    <p>Tek araç karar verir. Hayat tek başına bitmez. Şimdi birçok araç aynı anda çalışsın; her biri yalnız tuvali değil, <em>komşularını</em> da okusun. Buna karmaşık sistem denir: parçalar basit, bütün kestirilemez ve “zeki” görünebilir.</p>
    <p>Tek karınca feromonu koklar, adım atar. Yalnız bir karınca yuva kurmaz. Koloni kurar. Üç ilke:</p>
    <ul>
      <li>Birimler kısa menzilli ilişki kurar (zaten sınırlı algı).</li>
      <li>Birimler paralel çalışır: her <code>draw</code> turunda her araç kendi kuvvetini hesaplar.</li>
      <li>Bütün, parçaların toplamından fazla davranır (sürü, göç, kar tanesi). Soru: p5.js tuvalinde de çıkar mı?</li>
    </ul>
    <p>Üç ek özellik — hepsi her sistemde olmak zorunda değil:</p>
    <ul>
      <li><strong>Doğrusal olmama.</strong> Kelebek etkisi: Lorenz 1961’de 0.506127 yerine 0.506 yazınca hava simülasyonu bambaşka biter. Küçük sapma, orantısız sonuç. Bölüm 7’de bir biti çevirmek bütün deseni değiştirir.</li>
      <li><strong>Rekabet ve işbirliği.</strong> Sürüde hizalanma ve kaynaşma “birlikte kal”, ayrılma “bana yer aç”. Birini silince karmaşa düşer. Canlı sistemlerde ikisi birden vardır; hava durumunda yoktur.</li>
      <li><strong>Geri besleme.</strong> Çıktı tekrar girdi olur. Toplu taşıma örneği: otobüs cazip → daha çok biner → kalabalık / ücret → bazıları arabaya döner → trafik → yine otobüs yatırımı… Ekonomi, moda, seçim, kalabalık akışı da bu döngüye benzer.</li>
    </ul>

    <h3>Grup davranışları (çarpışmayalım)</h3>

    <p>Bölüm 4’te parçacık listesi vardı. Yine bir dizi: yüz <code>Vehicle</code>. <code>seek(mouse)</code> bireyseldir. Grup için “herkesten uzak dur” dersiniz ve listeyi yönteme verirsiniz: <code>vehicle.separate(vehicles)</code>. Parçacık sisteminden sıçrama budur: eleman artık yalnız kendini değil, dizideki diğerlerini okur.</p>
    ${N.img(
      "05_steering",
      "05_steering_34.png",
      "Şekil 5.32: Ayrılma = flee: istenen hız hedeften uzağa."
    )}
    ${N.img(
      "05_steering",
      "05_steering_35.png",
      "Şekil 5.33: Birden fazla yakın komşu varsa kaçış oklarının ortalaması."
    )}
    <p>Reynolds: “kalabalıktan kaçın.” Bir komşu çok yakınsa ondan flee et. Birkaç tanesi yakınsa kaçış oklarını topla, ortala, tavana çek, sonra yine istenen eksi hız. Döngüde <code>this !== other</code>: kendinizden kaçmayın — dizi sizi de tutar, mesafeniz 0’dır, yoksa deli gibi titrersiniz.</p>
    <p>Örnekte iki iyileştirme: eşik araca göre (<code>this.r * 2</code>); kaçış okunun boyu mesafeyle ters (<code>setMag(1 / d)</code>) — daha yakın, daha sert.</p>

    <h3>Örnek 5.9: Ayrılma (separation)</h3>
    <p>Sürükleyince yeni daire. Birbirlerine yapışmazlar; kenardan dolanırlar.</p>
    ${N.editor("ex59")}
    ${N.note(
      "Alıştırmalar 5.12–5.13 (orijinal)",
      `<p>5.12: <code>cohere</code> — ayrı durmanın tersi: uzaktaysa yaklaş, grubu tut. 5.13: Ayrılmayı yol takibine ekleyin (kalabalık şerit).</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-512" target="_blank" rel="noopener">5.12</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-513" target="_blank" rel="noopener">5.13</a></p>`
    )}

    <h3>Davranışları karıştırmak</h3>

    <p>Tek kuraldan karmaşa çıkmaz. Bölüm 2’de rüzgâr ve yerçekimi aynı <code>applyForce</code> kuyruğuna biniyordu. Şimdi kuvvetler iç istek. İstekler ağırlıklı olabilir: balık hem birbirine çarpmamak hem faredeki yeme varmak ister; yem birincilse seek zayıf, separate güçlü kalır (veya tersi).</p>
    <p>Yöntemler kuvveti artık uygulamayıp <em>döndürsün</em>. <code>applyBehaviors</code> içinde <code>mult</code> ile ölçekleyip sonra <code>applyForce</code>. Ağırlık sabit olmak zorunda değil: açlık artınca seek, kalabalıkta separate büyür.</p>

    <h3>Örnek 5.10: Seek + ayrılma</h3>
    <p>Daireler fareyi arar ama birbirinin içine girmez. <code>separate.mult(1.5)</code>, <code>seek.mult(0.5)</code> — sayıları değiştirin.</p>
    ${N.editor("ex510")}
    ${N.tryit([
      { do: "separate.mult(1.5) yerine 0 yapın.", expect: "Hepsi farenin üstüne yığılır." },
      { do: "seek.mult(0.5) yerine 2 yapın.", expect: "Yem baskın; yine de kısa menzilde itiş kalır." },
    ])}
    ${N.note(
      "Alıştırma 5.14 (orijinal)",
      `<p>Ağırlıklar zamanla değişsin (sin, Perlin) veya araçtan araca farklı olsun. Başka steering ekleyin.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-514" target="_blank" rel="noopener">Exercise 5.14</a></p>`
    )}

    <h3>Sürü (flocking)</h3>

    <p>Kuş, balık, böcek. Reynolds 1986, “Flocks, Herds, and Schools.” Bu bölümün dört taşı bir arada: formül, grup algısı, ağırlıklı kuvvetler, lidersiz çıkış. Sınıf adı bir kez daha değişir: Reynolds <em>boid</em> (uydurma kuş) der.</p>
    <ul>
      <li><strong>Ayrılma</strong> — komşuya çarpma.</li>
      <li><strong>Hizalanma</strong> — komşularla aynı yöne bak (ortalama hız).</li>
      <li><strong>Kaynaşma</strong> — komşuların ortalama konumuna seek (grupta kal).</li>
    </ul>
    ${N.img(
      "05_steering",
      "05_steering_36.png",
      "Şekil 5.34: Üç kural. Kalın ok örnek araç ve istenen hız."
    )}
    <p><code>flock()</code> üç kuvveti alıp <code>mult</code> ile tartar (örnekte ayrı 1.5, hizalanma 1, kaynaşma 1). Hizalanmada kritik ayrıntı: <em>bütün</em> boid’lerin hızını değil, belli mesafedekilerin hızını ortalama. Karınca yüz metre ötedekini bilmez (Şekil 5.35). <code>this !== other</code> yine: kendi hızınızı sonsuz geri beslemeyin.</p>
    ${N.img(
      "05_steering",
      "05_steering_37.png",
      "Şekil 5.35: Yalnız mahalle (daire) içindeki komşular."
    )}
    <p>Kaynaşma hizalanmaya benzer; ortalama <em>hız</em> yerine ortalama <em>konum</em>, sonra o noktayı seek. <code>Flock</code> sınıfı Bölüm 4’teki sistem gibidir: dizi tutar, <code>run</code>’da her boid’e <em>herkesi</em> verir.</p>

    <h3>Örnek 5.11: Sürü</h3>
    <p>Sürükleyince boid eklenir. Ortadan doğan 60 üçgen birkaç karede kümeler.</p>
    ${N.editor("ex511")}
    ${N.note(
      "Alıştırmalar 5.15–5.19 (orijinal)",
      `<p>5.15: Hizalanma yalnız görüş konisindeki boid’leri saysın. 5.16: Sürüye başka steering karıştırın. 5.17: Flake’in dördüncü kuralı <em>view</em> — görüşü kapatan boid’den yana kay. 5.18: Ağırlıklar, maxforce, maxspeed zamanla veya <code>createSlider</code> ile. 5.19: Sürüyü başka çizin.</p>
      ${N.img("05_steering", "05_steering_38.png", "Alıştırma 5.15: görüş konisi.")}
      ${N.img("05_steering", "05_steering_39.png", "Alıştırma 5.17: view kuralı.")}
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-515" target="_blank" rel="noopener">5.15</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-516" target="_blank" rel="noopener">5.16</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-517" target="_blank" rel="noopener">5.17</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-518" target="_blank" rel="noopener">5.18</a> ·
      <a href="https://natureofcode.com/autonomous-agents/#exercise-519" target="_blank" rel="noopener">5.19</a></p>`
    )}

    <h2>Algoritma maliyeti (sketch neden yavaşlar?)</h2>

    <p>Çizmek yavaşlatabilir (Bölüm 4, WebGL). Sürüde asıl fatura algoritmadır. Bilgisayarcılar buna büyük O der: iş bitene kadar kaç tur?</p>
    <p>100 çikolata, biri bitter: en kötü 100 bakış, O(N). Parçacık sistemi de öyle: N tane, N kez çiz. Sürüde her boid her boid’e bakar: 100×100 = 10.000. 1.000 boid → 1.000.000 tur. 10.000 → 100.000.000. N on katına çıkınca tur yüz katına çıkar: O(N<sup>2</sup>).</p>
    <p>“Yalnız yakındakine bakayım” yetmez: yakını bulmak için yine herkese bakarsınız. Başka yol var mı?</p>

    <h3>Uzayı bölmek</h3>

    <p>Reynolds (2000, “Interaction with Groups of Autonomous Characters”) <strong>bin-lattice</strong> önerir: tuvali hücrelere böl. 10×10 = 100 hücre, 2.000 boid, hücre başına ~20. Her boid yalnız kendi hücresine bakarsa 20×20×100 = 40.000 tur — 4.000.000 yerine (Şekil 5.36).</p>
    ${N.img(
      "05_steering",
      "05_steering_40.png",
      "Şekil 5.36: Araçlar kare hücrelere düşmüş."
    )}
    <p>Her kare ızgara boşaltılır, her boid konumuna göre hücreye yazılır. Komşu ararken yalnız o liste (ve pratikte 3×3 komşu hücre). Hepsi bir köşeye yığılırsa yine N<sup>2</sup>’ye düşersiniz; bin, yayılmış kalabalıkta parlar. Düzensiz yığılma için <strong>quadtree</strong>: hücre dolunca dörde bölünür, gereken yerde incelir. Barnes–Hut (Bölüm 2 n-cisim) aynı ağacı yerçekimi için kullanır.</p>

    <h3>Örnek 5.12: Izgara (bin-lattice)</h3>
    <p>Izgara çizgileri ve farenin 3×3 mahallesi. Çok boid; her biri yalnız yakındaki hücrelere bakar.</p>
    ${N.editor("ex512")}

    <h3>Örnek 5.13: Quadtree</h3>
    <p>Noktalar ortaya yığılmış. Faredeki kırmızı dikdörtgen yalnız o aralıktaki noktaları kalın gösterir — ağaç bütün listeyi dolaşmadan eleme yapar.</p>
    ${N.editor("ex513")}
    ${N.note(
      "Alıştırma 5.20 (orijinal)",
      `<p>Örnek 5.12’deki sürüyü quadtree ile tarayın. Coding Train Challenge #98.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-520" target="_blank" rel="noopener">Exercise 5.20</a></p>`
    )}

    <h3>Başka hızlandırma</h3>
    <p>Üç alışkanlık: kare uzunluk, sin/cos tablosu, gereksiz <code>p5.Vector</code> üretmemek.</p>
    <h4>Kare uzunluk (<code>magSq</code>)</h4>
    <p><code>mag()</code> Pisagor’dur, içinde karekök vardır. “Uzunluk 10’dan büyük mü?” diye soruyorsanız kareköke gerek yok: kare uzunluğu 100’den büyük mü, aynı soru. Binlerce vektörde <code>sqrt</code> birikir.</p>
    ${N.math(
      "|v|<sup>2</sup> = v<sub>x</sub><sup>2</sup> + v<sub>y</sub><sup>2</sup>",
      "Karekök yok. p5.js <code>v.magSq()</code> bunu döndürür. Karşılaştırma: <code>if (v.magSq() &gt; 100)</code> ile <code>if (v.mag() &gt; 10)</code> aynı eşiği sorar."
    )}
    <h4>Sin / cos tablosu</h4>
    <p>Tek <code>sin</code> ucuzdur. Her kare 10.000 kez <code>sin(PI)</code> yazmak saçmadır: bir kez hesapla, diziden oku. Açı 0…360 (veya daha ince adım) için iki dizi doldurulur; çizimde dizin bakılır. Dizi okumak <code>sin</code> çağırmaktan ucuzdur.</p>
    <h3>Örnek 5.14: Sin/cos tablosu</h3>
    <p>Noktalardan bir daire; yarıçap tablodaki sine göre nefes alır. <code>sinLUT[i]</code> hazır değer, her kare <code>sin(i)</code> değil.</p>
    ${N.editor("ex514")}
    <h4>Gereksiz vektör nesnesi</h4>
    <p>Her <code>createVector</code> bellek yer. 1.000 araç için her kare <code>createVector(mouseX, mouseY)</code> 1.000 fare vektörü demektir. Farenin vektörünü döngünün <em>dışında</em> bir kez üretin, ya da <code>setup</code>’ta bir tane açıp <code>mouse.set(mouseX, mouseY)</code> ile doldurun. <code>seek</code> içinde <code>desired</code> ve <code>steer</code> iki nesnedir; steer’i desired’in üstüne yazmak okunurluğu düşürür, nesneyi azaltır. Kitap örnekleri okunaklı kalsın diye fazla nesne üretir; profil gerekince kısın.</p>
    ${N.note(
      "Alıştırma 5.21 (orijinal)",
      `<p>Sürü örneğinden geçici vektörleri azaltın; olabildiğince <code>magSq</code> kullanın.</p>
      <p><a href="https://natureofcode.com/autonomous-agents/#exercise-521" target="_blank" rel="noopener">Exercise 5.21</a></p>`
    )}

    <h2>Ekosistem projesi</h2>
    <p>Yaratıkların davranışını steering ile sürün. Okul/sürü; yem arayan seek (hareketli av için pursuit); dere gibi akış alanı; bir yaratıkta mümkün olduğunca çok davranış, ağırlıkları açıp kapayan kural; sürüden yapılmış tek yaratık, sonra onların sürüsü; geçmişin bugünkü ağırlıkları değiştirmesi (bellek).</p>
    ${N.img(
      "05_steering",
      "05_steering_41.png",
      "Orijinal kitaptaki ekosistem görseli."
    )}

    ${N.resources([
      { kind: "Kitap", title: "Chapter 5 · Autonomous Agents", url: "https://natureofcode.com/autonomous-agents/" },
      { kind: "Kod", title: "05_steering örnekleri", url: "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering" },
      { kind: "Video", title: "Coding Train · Steering agents", url: "https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/1-steering-agents" },
      { kind: "Video", title: "Coding Train · Seeking a target", url: "https://www.youtube.com/watch?v=p1Ws1ZhG36g" },
      { kind: "Video", title: "Coding Train · Arrive", url: "https://www.youtube.com/watch?v=OxHJ-o_bbzs" },
      { kind: "Video", title: "Coding Train · Pursue & Evade", url: "https://thecodingtrain.com/pursuit" },
      { kind: "Video", title: "Coding Train · Path following / izdüşüm", url: "https://www.youtube.com/watch?v=rlZYT-uvmGQ" },
      { kind: "Video", title: "Coding Train · Quadtree (#98)", url: "https://thecodingtrain.com/quadtree" },
      { kind: "Video", title: "Coding Train · 2D arrays", url: "https://thecodingtrain.com/2d-array" },
      { kind: "Makale", title: "Reynolds · Steering Behaviors for Autonomous Characters", url: "https://www.red3d.com/cwr/steer/" },
      { kind: "Makale", title: "Reynolds · Interaction with Groups of Autonomous Characters (PDF)", url: "https://www.red3d.com/cwr/papers/2000/pip.pdf" },
      { kind: "Referans", title: "p5.js · heading", url: "https://p5js.org/reference/p5.Vector/heading/" },
      { kind: "Referans", title: "p5.js · atan2", url: "https://p5js.org/reference/p5/atan2/" },
      { kind: "Referans", title: "p5.js · rotate", url: "https://p5js.org/reference/p5/rotate/" },
      { kind: "Referans", title: "p5.js · p5.Vector.dot", url: "https://p5js.org/reference/p5.Vector/dot/" },
      { kind: "Referans", title: "p5.js · angleBetween", url: "https://p5js.org/reference/p5.Vector/angleBetween/" },
      { kind: "Referans", title: "p5.js · magSq", url: "https://p5js.org/reference/p5.Vector/magSq/" },
    ])}
    <p><a href="#/ch4">← Parçacıklar</a></p>
  `,
  editors: {
    ex51: {
      title: "Örnek 5.1: Hedefi aramak",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-51-seeking-a-target",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_01_seek",
      },
      files: [
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 8;
    this.maxforce = 0.2;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  show() {
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let vehicle;

function setup() {
  createCanvas(400, 240);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);
  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(mouse.x, mouse.y, 48);
  vehicle.seek(mouse);
  vehicle.update();
  vehicle.show();
  fill(20);
  noStroke();
  text("seek: her kare maxspeed — geçmesi tasarım", 10, 22);
}`,
        },
      ],
    },
    ucgenDon: {
      title: "Üçgen, heading ve rotate tuzağı",
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let pos = createVector(200, 140);
  let vel = createVector(mouseX - pos.x, mouseY - pos.y);
  if (vel.mag() < 12) {
    vel = createVector(70, 0);
  }
  fill(20);
  noStroke();
  text("Gri: rotate yok, burun hep +x (sağa).", 8, 18);
  text("Siyah: translate + rotate(heading()).", 8, 36);
  text("heading() = atan2(vy, vx) = " + nf(vel.heading(), 1, 2) + " rad", 8, 54);
  text("rotate(90) radyan okunur (~14 tur). heading() zaten radyan.", 8, 72);

  stroke(200);
  strokeWeight(2);
  let tip = vel.copy();
  tip.setMag(50);
  line(pos.x, pos.y, pos.x + tip.x, pos.y + tip.y);

  let r = 14;
  push();
  translate(pos.x, pos.y);
  fill(210);
  stroke(160);
  strokeWeight(1);
  beginShape();
  vertex(r * 2, 0);
  vertex(-r * 2, -r);
  vertex(-r * 2, r);
  endShape(CLOSE);
  pop();

  push();
  translate(pos.x, pos.y);
  rotate(vel.heading());
  fill(40);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(r * 2, 0);
  vertex(-r * 2, -r);
  vertex(-r * 2, r);
  endShape(CLOSE);
  pop();
}`,
        },
      ],
    },
    ex52: {
      title: "Örnek 5.2: Hedefe varmak",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-52-arriving-at-a-target",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_02_arrive",
      },
      files: [
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 4;
    this.maxforce = 0.1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.position);
    let d = desired.mag();
    if (d < 100) {
      let m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  show() {
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let vehicle;

function setup() {
  createCanvas(400, 240);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);
  noFill();
  stroke(210);
  strokeWeight(1);
  circle(mouse.x, mouse.y, 200);
  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(mouse.x, mouse.y, 48);
  vehicle.arrive(mouse);
  vehicle.update();
  vehicle.show();
  fill(20);
  noStroke();
  text("arrive: 100 px dairede yavaşlar, hedefte durur", 10, 22);
}`,
        },
      ],
    },
    seekArrive: {
      title: "Seek geçer, arrive durur",
      files: [
        {
          name: "sketch.js",
          content: `let seeker;
let arriver;

function setup() {
  createCanvas(400, 240);
  seeker = new Vehicle(60, 80, "seek");
  arriver = new Vehicle(60, 170, "arrive");
}

function draw() {
  background(255);
  let hedef = createVector(mouseX, mouseY);
  noFill();
  stroke(210);
  circle(hedef.x, hedef.y, 200);
  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(hedef.x, hedef.y, 28);
  seeker.act(hedef);
  arriver.act(hedef);
  seeker.update();
  arriver.update();
  seeker.show();
  arriver.show();
  fill(20);
  noStroke();
  text("Üst seek: her kare tam gaz — geçmesi tasarım.", 8, 18);
  text("Alt arrive: 100 px dairede yavaşlar.", 8, 36);
}

class Vehicle {
  constructor(x, y, kind) {
    this.position = createVector(x, y);
    this.velocity = createVector(4, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 5;
    this.maxforce = 0.25;
    this.kind = kind;
  }

  act(target) {
    let desired = p5.Vector.sub(target, this.position);
    let d = desired.mag();
    if (this.kind === "arrive" && d < 100) {
      desired.setMag(map(d, 0, 100, 0, this.maxspeed));
    } else {
      desired.setMag(this.maxspeed);
    }
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.acceleration.add(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    fill(this.kind === "seek" ? 70 : 190);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
    fill(20);
    noStroke();
    text(this.kind, this.position.x - 18, this.position.y - 12);
  }
}`,
        },
      ],
    },
    ex53: {
      title: "Örnek 5.3: Duvarların içinde kal",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-53-stay-within-walls-steering-behavior",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_03_stay_within_walls",
      },
      files: [
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, 4);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 3;
    this.maxforce = 0.15;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  boundaries(offset) {
    let desired = null;
    if (this.position.x < offset) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - offset) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }
    if (this.position.y < offset) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - offset) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }
    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  show() {
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let vehicle;
let debug = true;
let offset = 25;

function setup() {
  createCanvas(400, 240);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);
  if (debug) {
    stroke(0);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, width - offset * 2, height - offset * 2);
  }
  vehicle.boundaries(offset);
  vehicle.update();
  vehicle.show();
  fill(20);
  noStroke();
  text("tıkla: güvenli dikdörtgen aç/kapa", 10, 22);
}

function mousePressed() {
  debug = !debug;
}`,
        },
      ],
    },
    ex54: {
      title: "Örnek 5.4: Akış alanını izlemek",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-54-flow-field-following",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_04_flow_field",
      },
      files: [
        {
          name: "flowfield.js",
          content: `class FlowField {
  constructor(r) {
    this.resolution = r;
    this.cols = floor(width / this.resolution);
    this.rows = floor(height / this.resolution);
    this.field = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = new Array(this.rows);
    }
    this.init();
  }

  init() {
    noiseSeed(random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let w = width / this.cols;
        let h = height / this.rows;
        let v = this.field[i][j].copy();
        v.setMag(w * 0.5);
        let x = i * w + w / 2;
        let y = j * h + h / 2;
        stroke(0);
        strokeWeight(1);
        line(x, y, x + v.x, y + v.y);
      }
    }
  }

  lookup(position) {
    let column = constrain(floor(position.x / this.resolution), 0, this.cols - 1);
    let row = constrain(floor(position.y / this.resolution), 0, this.rows - 1);
    return this.field[column][row].copy();
  }
}`,
        },
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.r = 4;
    this.maxspeed = ms;
    this.maxforce = mf;
  }

  run() {
    this.update();
    this.borders();
    this.show();
  }

  follow(flow) {
    let desired = flow.lookup(this.position);
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  show() {
    let theta = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let debug = true;
let flowfield;
let vehicles = [];

function setup() {
  createCanvas(400, 240);
  flowfield = new FlowField(20);
  for (let i = 0; i < 40; i++) {
    vehicles.push(
      new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5))
    );
  }
}

function draw() {
  background(255);
  if (debug) flowfield.show();
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
  fill(20);
  noStroke();
  text("tıkla: yeni alan   boşluk: oklar", 10, 18);
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}

function mousePressed() {
  flowfield.init();
}`,
        },
      ],
    },
    ex55: {
      title: "Örnek 5.5: Path nesnesi",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-55-creating-a-path-object",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/nature_of_code_example_5_5_path_only",
      },
      files: [
        {
          name: "path.js",
          content: `class Path {
  constructor() {
    this.radius = 20;
    this.start = createVector(0, height / 3);
    this.end = createVector(width, (2 * height) / 3);
  }

  show() {
    strokeWeight(this.radius * 2);
    stroke(0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let path;

function setup() {
  createCanvas(400, 240);
  path = new Path();
}

function draw() {
  background(255);
  path.show();
}`,
        },
      ],
    },
    noktaCarpim: {
      title: "Nokta çarpım: sayı, gölge, açı",
      files: [
        {
          name: "sketch.js",
          content: `function setup() {
  createCanvas(400, 240);
}

function draw() {
  background(255);
  let origin = createVector(200, 130);
  let a = createVector(90, 0);
  let b = createVector(mouseX - origin.x, mouseY - origin.y);
  if (b.mag() < 24) {
    b.set(50, -40);
  }
  let n = a.dot(b);
  let magProduct = a.mag() * b.mag();
  let ang = acos(constrain(n / magProduct, -1, 1));
  let durum = "dar açı, artı — aynı yana";
  if (abs(n) < 400) durum = "dike yakın, ~0 — ortak yön yok";
  if (n < -400) durum = "geniş açı, eksi — zıt yana";

  fill(20);
  noStroke();
  text("A sabit sağa. B fare. A · B bir sayı, ok değil.", 8, 18);
  text("A · B = " + round(n) + "    " + durum, 8, 36);
  text("açı " + round(degrees(ang)) + "°   (angleBetween)", 8, 54);

  let aHat = a.copy();
  aHat.normalize();
  let projLen = b.dot(aHat);
  stroke(40);
  strokeWeight(7);
  line(origin.x, origin.y, origin.x + aHat.x * projLen, origin.y);

  stroke(40, 90, 180);
  strokeWeight(3);
  line(origin.x, origin.y, origin.x + a.x, origin.y + a.y);
  stroke(180, 40, 40);
  line(origin.x, origin.y, origin.x + b.x, origin.y + b.y);

  fill(40, 90, 180);
  noStroke();
  text("A", origin.x + a.x + 8, origin.y + 4);
  fill(180, 40, 40);
  text("B", origin.x + b.x + 8, origin.y + b.y);
  fill(20);
  text("gölge (izdüşüm)", origin.x + 10, origin.y + 22);
}`,
        },
      ],
    },
    ex56: {
      title: "Örnek 5.6: Düz şeridi izlemek",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-56-simple-path-following",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_05_path_following_simple",
      },
      files: [
        {
          name: "path.js",
          content: `class Path {
  constructor() {
    this.radius = 20;
    this.start = createVector(0, height / 3);
    this.end = createVector(width, (2 * height) / 3);
  }

  show() {
    strokeWeight(this.radius * 2);
    stroke(0, 50);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}`,
        },
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y, maxspeed, maxforce) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(2, 0);
    this.r = 4;
    this.maxspeed = maxspeed;
    this.maxforce = maxforce;
  }

  run() {
    this.update();
    this.show();
  }

  follow(path) {
    let future = this.velocity.copy();
    future.setMag(25);
    future.add(this.position);
    let normalPoint = getNormalPoint(future, path.start, path.end);
    let b = p5.Vector.sub(path.end, path.start);
    b.setMag(25);
    let target = p5.Vector.add(normalPoint, b);
    let distance = p5.Vector.dist(normalPoint, future);
    if (distance > path.radius) {
      this.seek(target);
    }
    if (debug) {
      fill(127);
      stroke(0);
      line(this.position.x, this.position.y, future.x, future.y);
      circle(future.x, future.y, 6);
      line(future.x, future.y, normalPoint.x, normalPoint.y);
      circle(normalPoint.x, normalPoint.y, 6);
      if (distance > path.radius) fill(255, 0, 0);
      noStroke();
      circle(target.x, target.y, 10);
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    if (desired.mag() === 0) return;
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  borders(p) {
    if (this.position.x > p.end.x + this.r) {
      this.position.x = p.start.x - this.r;
      this.position.y = p.start.y + (this.position.y - p.end.y);
    }
  }

  show() {
    let theta = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}

function getNormalPoint(position, a, b) {
  let vectorA = p5.Vector.sub(position, a);
  let vectorB = p5.Vector.sub(b, a);
  vectorB.normalize();
  vectorB.mult(vectorA.dot(vectorB));
  return p5.Vector.add(a, vectorB);
}`,
        },
        {
          name: "sketch.js",
          content: `let debug = true;
let path;
let vehicle1;
let vehicle2;

function setup() {
  createCanvas(400, 240);
  path = new Path();
  vehicle1 = new Vehicle(0, height / 2, 2, 0.02);
  vehicle2 = new Vehicle(0, height / 2, 3, 0.05);
}

function draw() {
  background(255);
  path.show();
  vehicle1.follow(path);
  vehicle2.follow(path);
  vehicle1.run();
  vehicle2.run();
  vehicle1.borders(path);
  vehicle2.borders(path);
  fill(20);
  noStroke();
  text("boşluk: gelecek / normal / hedef", 10, 18);
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}`,
        },
      ],
    },
    ex57: {
      title: "Örnek 5.7: Dilimli yol",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-57-path-made-of-multiple-line-segments",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/5_6_path_segments_only",
      },
      files: [
        {
          name: "path.js",
          content: `class Path {
  constructor() {
    this.radius = 20;
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }

  show() {
    stroke(200);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let pathPoint of this.points) {
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (let pathPoint of this.points) {
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let path;

function setup() {
  createCanvas(400, 240);
  path = new Path();
  path.addPoint(-20, height / 2);
  path.addPoint(70, 40);
  path.addPoint(250, 190);
  path.addPoint(width + 20, height / 2);
}

function draw() {
  background(255);
  path.show();
}`,
        },
      ],
    },
    ex58: {
      title: "Örnek 5.8: Dilimli yolu izlemek",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-58-path-following",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_08_path_following",
      },
      files: [
        {
          name: "path.js",
          content: `class Path {
  constructor() {
    this.radius = 20;
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }

  getStart() {
    return this.points[0];
  }

  getEnd() {
    return this.points[this.points.length - 1];
  }

  show() {
    stroke(200);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }
}`,
        },
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(2, 0);
    this.r = 4;
    this.maxspeed = ms || 4;
    this.maxforce = mf || 0.1;
  }

  run() {
    this.update();
    this.show();
  }

  follow(path) {
    let future = this.velocity.copy();
    future.setMag(50);
    future.add(this.position);
    let target = null;
    let normal = null;
    let worldRecord = Infinity;
    for (let i = 0; i < path.points.length - 1; i++) {
      let a = path.points[i];
      let b = path.points[i + 1];
      let normalPoint = getNormalPoint(future, a, b);
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b.copy();
      }
      let distance = p5.Vector.dist(future, normalPoint);
      if (distance < worldRecord) {
        worldRecord = distance;
        normal = normalPoint;
        target = normalPoint.copy();
        let dir = p5.Vector.sub(b, a);
        dir.setMag(10);
        target.add(dir);
      }
    }
    if (worldRecord > path.radius && target !== null) {
      this.seek(target);
    }
    if (debug) {
      stroke(0);
      fill(127);
      line(this.position.x, this.position.y, future.x, future.y);
      circle(future.x, future.y, 6);
      circle(normal.x, normal.y, 6);
      line(future.x, future.y, normal.x, normal.y);
      if (worldRecord > path.radius) fill(255, 0, 0);
      noStroke();
      circle(target.x, target.y, 10);
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    if (desired.mag() === 0) return;
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  borders(path) {
    if (this.position.x > path.getEnd().x + this.r) {
      this.position.x = path.getStart().x - this.r;
      this.position.y = path.getStart().y + (this.position.y - path.getEnd().y);
    }
  }

  show() {
    let theta = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}

function getNormalPoint(p, a, b) {
  let ap = p5.Vector.sub(p, a);
  let ab = p5.Vector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  return p5.Vector.add(a, ab);
}`,
        },
        {
          name: "sketch.js",
          content: `let debug = true;
let path;
let car1;
let car2;

function setup() {
  createCanvas(400, 240);
  newPath();
  car1 = new Vehicle(0, height / 2, 2, 0.04);
  car2 = new Vehicle(0, height / 2, 3, 0.1);
}

function draw() {
  background(255);
  path.show();
  car1.follow(path);
  car2.follow(path);
  car1.run();
  car2.run();
  car1.borders(path);
  car2.borders(path);
  fill(20);
  noStroke();
  text("tıkla: yeni yol   boşluk: hata ayıklama", 10, 18);
}

function newPath() {
  path = new Path();
  path.addPoint(-20, height / 2);
  path.addPoint(random(0, width / 2), random(0, height));
  path.addPoint(random(width / 2, width), random(0, height));
  path.addPoint(width + 20, height / 2);
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}

function mousePressed() {
  newPath();
}`,
        },
      ],
    },
    ex59: {
      title: "Örnek 5.9: Ayrılma",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-59-separation",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_07_separation",
      },
      files: [
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = 3;
    this.maxforce = 0.2;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  separate(vehicles) {
    let desiredSeparation = this.r * 2;
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of vehicles) {
      let d = p5.Vector.dist(this.position, other.position);
      if (this != other && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.setMag(1 / d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    circle(this.position.x, this.position.y, this.r);
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let vehicles = [];

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 25; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);
  for (let v of vehicles) {
    v.separate(vehicles);
    v.update();
    v.borders();
    v.show();
  }
  fill(20);
  noStroke();
  text("sürükle: yeni daire", 10, 22);
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}`,
        },
      ],
    },
    ex510: {
      title: "Örnek 5.10: Seek + ayrılma",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-510-combining-steering-behaviors-seek-and-separate",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/noc_5_08_separation_and_seek",
      },
      files: [
        {
          name: "vehicle.js",
          content: `class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 3;
    this.maxforce = 0.2;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  applyBehaviors(vehicles) {
    let separateForce = this.separate(vehicles);
    let seekForce = this.seek(createVector(mouseX, mouseY));
    separateForce.mult(1.5);
    seekForce.mult(0.5);
    this.applyForce(separateForce);
    this.applyForce(seekForce);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  separate(vehicles) {
    let desiredSeparation = this.r * 2;
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of vehicles) {
      let d = p5.Vector.dist(this.position, other.position);
      if (this != other && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.setMag(1 / d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxspeed);
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    circle(this.position.x, this.position.y, this.r * 2);
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let vehicles = [];

function setup() {
  createCanvas(400, 240);
  for (let i = 0; i < 40; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);
  for (let v of vehicles) {
    v.applyBehaviors(vehicles);
    v.update();
    v.borders();
    v.show();
  }
}`,
        },
      ],
    },
    ex511: {
      title: "Örnek 5.11: Sürü",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-511-flocking",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/example_5_9_flocking",
      },
      files: [
        {
          name: "boid.js",
          content: `class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;
    this.maxforce = 0.05;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    let sep = this.separate(boids);
    let ali = this.align(boids);
    let coh = this.cohere(boids);
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  show() {
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  separate(boids) {
    let desiredSeparation = 25;
    let steer = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.setMag(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  align(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohere(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }
}`,
        },
        {
          name: "flock.js",
          content: `class Flock {
  constructor() {
    this.boids = [];
  }

  run() {
    for (let boid of this.boids) {
      boid.run(this.boids);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let flock;

function setup() {
  createCanvas(400, 240);
  flock = new Flock();
  for (let i = 0; i < 60; i++) {
    flock.addBoid(new Boid(width / 2, height / 2));
  }
}

function draw() {
  background(255);
  flock.run();
  fill(20);
  noStroke();
  text("sürükle: boid ekle", 10, 22);
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}`,
        },
      ],
    },
    ex512: {
      title: "Örnek 5.12: Izgara (bin-lattice)",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-512-bin-lattice-spatial-subdivision",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/example_5_9_flocking_with_binning",
      },
      files: [
        {
          name: "boid.js",
          content: `class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;
    this.maxforce = 0.05;
  }

  run() {
    let col = floor(this.position.x / resolution);
    let row = floor(this.position.y / resolution);
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newCol = col + i;
        let newRow = row + j;
        if (newCol >= 0 && newCol < cols && newRow >= 0 && newRow < rows) {
          neighbors = neighbors.concat(grid[newCol][newRow]);
        }
      }
    }
    this.flock(neighbors);
    this.update();
    this.borders();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    let sep = this.separate(boids);
    let ali = this.align(boids);
    let coh = this.cohesion(boids);
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  show() {
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < desiredseparation) {
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.setMag(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }
}`,
        },
        {
          name: "flock.js",
          content: `class Flock {
  constructor() {
    this.boids = [];
  }

  run() {
    for (let boid of this.boids) {
      boid.run();
    }
  }

  addBoid(boid) {
    this.boids.push(boid);
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let flock;
let grid;
let cols;
let rows;
let resolution = 40;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(400, 240);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
  flock = new Flock();
  for (let i = 0; i < 180; i++) {
    flock.addBoid(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = [];
    }
  }
  for (let boid of flock.boids) {
    let col = floor(boid.position.x / resolution);
    let row = floor(boid.position.y / resolution);
    col = constrain(col, 0, cols - 1);
    row = constrain(row, 0, rows - 1);
    grid[col][row].push(boid);
  }
  stroke(200);
  strokeWeight(1);
  for (let i = 0; i <= cols; i++) {
    line(i * resolution, 0, i * resolution, height);
  }
  for (let j = 0; j <= rows; j++) {
    line(0, j * resolution, width, j * resolution);
  }
  let mouseCol = floor(mouseX / resolution);
  let mouseRow = floor(mouseY / resolution);
  noStroke();
  fill(255, 50, 50, 100);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = mouseCol + i;
      let row = mouseRow + j;
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        rect(col * resolution, row * resolution, resolution, resolution);
      }
    }
  }
  flock.run();
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}`,
        },
      ],
    },
    ex513: {
      title: "Örnek 5.13: Quadtree",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-513-quadtree",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/5_11_quadtree_part_1",
      },
      files: [
        {
          name: "quadtree.js",
          content: `class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x < this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y < this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    this.northeast = new QuadTree(new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2), this.capacity);
    this.northwest = new QuadTree(new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2), this.capacity);
    this.southeast = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), this.capacity);
    this.southwest = new QuadTree(new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2), this.capacity);
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }
    if (this.northeast.insert(point)) return true;
    if (this.northwest.insert(point)) return true;
    if (this.southeast.insert(point)) return true;
    if (this.southwest.insert(point)) return true;
  }

  query(range, found) {
    if (!found) {
      found = [];
    }
    if (!this.boundary.intersects(range)) {
      return found;
    }
    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }
    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }
    return found;
  }

  show() {
    stroke(0);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
    for (let p of this.points) {
      strokeWeight(3);
      stroke(0);
      point(p.x, p.y);
    }
    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
  }
}`,
        },
        {
          name: "sketch.js",
          content: `let qtree;

function setup() {
  createCanvas(400, 240);
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qtree = new QuadTree(boundary, 8);
  for (let i = 0; i < 600; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    qtree.insert(new Point(x, y));
  }
}

function draw() {
  background(255);
  qtree.show();
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 40, 40);
  if (mouseX < width && mouseY < height) {
    strokeWeight(2);
    stroke(255, 50, 50);
    fill(255, 50, 50, 50);
    rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = qtree.query(range);
    for (let p of points) {
      strokeWeight(5);
      stroke(50);
      point(p.x, p.y);
    }
  }
}`,
        },
      ],
    },
    ex514: {
      title: "Örnek 5.14: Sin/cos tablosu",
      original: {
        book: "https://natureofcode.com/autonomous-agents/#example-514-sincos-lookup-table",
        github:
          "https://github.com/nature-of-code/noc-book-2/tree/main/content/examples/05_steering/example_5_12_sine_cosine_lookup_table",
      },
      files: [
        {
          name: "sketch.js",
          content: `let sinLUT;
let cosLUT;
const SC_PRECISION = 0.5;
const SC_INV_PREC = 1 / SC_PRECISION;
const SC_PERIOD = Math.floor(360 * SC_INV_PREC);
let radius;

function initSinCos() {
  sinLUT = [];
  cosLUT = [];
  for (let i = 0; i < SC_PERIOD; i++) {
    sinLUT[i] = sin(i * DEG_TO_RAD * SC_PRECISION);
    cosLUT[i] = cos(i * DEG_TO_RAD * SC_PRECISION);
  }
}

function setup() {
  createCanvas(400, 240);
  initSinCos();
}

function draw() {
  background(255);
  radius = 50 + 50 * sinLUT[frameCount % SC_PERIOD];
  for (let i = 0; i < 360; i += 5) {
    let theta = int((i * SC_INV_PREC) % SC_PERIOD);
    stroke(0);
    strokeWeight(4);
    point(
      width / 2 + radius * cosLUT[theta],
      height / 2 + radius * sinLUT[theta]
    );
  }
  fill(20);
  noStroke();
  text("sinLUT / cosLUT — her kare sin() yok, dizi var", 10, 22);
}`,
        },
      ],
    },
  },
});
