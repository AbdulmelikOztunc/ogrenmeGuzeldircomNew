var language;
var category;
var word;
var imageCounter = 1;
var enteredLetters = [];

$(document).ready(function()
	{
		startDiv=document.getElementById('start');
		levelDiv=document.getElementById('level');
		levelDiv.style.display= 'none';
		gameDiv=document.getElementById('gameArea');
		gameDiv.style.display= 'none';
		
		$("#image1")
		.css("right","0")
		for (var i = 2; i <= 10 ; i++) {
			$("#image"+i)
			.css({
				"display":"none",
				"right":"0"
			})
		}

		$("#start button")
		.hover(function(){
			$(this)
			.animate({width: "42%", height:"33%"}, 300)
		},function(){
			$(this)
			.animate({width: "42%", height:"30%"}, 300)
		})

		$("#but1")
		.click(function(){
			language = "tr";
			startDiv.style.display="none";
			levelDiv.style.display= 'block';
			levelDiv.classList.remove('none');
			$("body")
			.css("background-color","#202124")

		})

		$("#but2")
		.click(function(){
			language ="eng";
			startDiv.style.display="none";
			levelDiv.classList.remove('none');
			levelDiv.style.display= 'block';

			$("body")
			.css("background-color","#202124")

			$("#select")
			.html("Please select a level")

			$("#newGame")
			.html("New Game")
			selects = ["Easy", "Medium", "Hard"]
			for (var i = 1; i < 4; i++) {
				$("#b"+i)
				.html(selects[i-1])			
			};		
		})

		$("#level button")
		.hover(function(){
			$(this)
			.animate({width: "26%", height:"12%"}, 100)
		},function(){
			$(this)
			.animate({width: "20%", height:"10%"}, 100)
		})
		.click(function(){
			category = $(this).html();
			if (category=="Kolay" || category=="Easy") {
				word = Easy();
			}else if (category=="Orta"|| category=="Medium") {
				word = Medium();
			}else if (category=="Zor"|| category=="Hard") {
				word = Hard();
			}
			for (var i = 1; i <= word[0].length; i++) {
				$("#h"+i)
				.css({ 'background-color': "#3823b6",
		            "color": "#f9bc38",					
					"font-weight": "bold",
					"text-align": "center",
					"padding-top": "5px",
					"display": "block"
			     })
			}
			//levelDiv.style.display= 'none';
			inputObject=document.getElementById('letter');
			if (language=="tr") {
				inputObject.placeholder = "Harf giriniz.";
				$("#gameText")
				.html("* " + word[1])
				$("#entered")
				.html("Girilen harfler: ")
			}
			else{
				inputObject.placeholder = "Enter a letter";
				$("#entered")
				.html("Entered letters: ")
				$("#gameText")
				.html("* " +  word[1])
				
				
			}
			gameArea.style.display = "block";
			gameArea.classList.remove('none');

		})


		
		$("#newGame")
		.click(function(){
			gameDiv.style.display= 'none';
			levelDiv.style.display="block";
			levelDiv.classList.remove('none');
		})

		$("#letter")
		.keyup(function(){
			letter = $(this).val();
			document.getElementById('letter').value=""; 
			evaluate(letter);
		})
		function isEntered(l){
			if (language=="tr") {	//türkçede ı-i toUpperCase ile sıkıntı oluyor.
				for (var i =0; i < enteredLetters.length-1; i++) {
					if (l=="ı" || l=="I") {		
						if (enteredLetters[i]=="ı" || enteredLetters[i]=="I") 
							return true;
					}	
					else if (l=="i" || l=="İ"){ 
						if (enteredLetters[i]=="i" || enteredLetters[i]=="İ") 
							return true;
					}
					else if (enteredLetters[i].toLowerCase() == l.toLowerCase()) 
						return true;
				}
			}else{
				for (var i =0; i < enteredLetters.length-1; i++) {
					if (enteredLetters[i].toLowerCase() == l.toLowerCase()) 
						return true;
				}
				return false;
			}
		}
	
		function evaluate(l){
			enteredLetters.push(l);
			flag = false;
			if (!isLetter(l)) {
				if (language=="tr") 
					swal("Lütfen sadece harf giriniz. Ve boş girmeyiniz")
				else
					swal("Please enter a letter");
			}
			else if (l.length>1) {
				if (language=="tr") 
					swal("Lütfen sadece harf giriniz. Ve boş girmeyiniz")
				else
					swal("Please enter a letter");
			}
			else if(l==""){
				//Hiç bir şey yapma
			}
			else if(isEntered(l)){
				if (language=="tr") 
					swal("Lütfen girdiğiniz harfi tekrar girmeyiniz")
				else
					swal("Please don't enter the letters you have entered");
			}
			else{
				if (language=="tr") {	// Türkçede ı-i toUpperCase ile sıkıntı çıkartıyor.
					for (var i = 1; i <= word[0].length; i++) {
						if (l=="ı" || l=="I") {		
							if (word[0][i-1]=="ı" || word[0][i-1]=="I") {
								$("#h"+i)
								.html("ı");
								flag=true;
							};	
						}
						else if (l=="i" || l=="İ") {
							if (word[0][i-1]=="i" || word[0][i-1]=="İ") {
								$("#h"+i)
								.html("i");
								flag=true;
							};	
						}
						else if (word[0][i-1].toUpperCase() == l.toUpperCase()) {
							$("#h"+i)
							.html(l.toLowerCase());
							flag=true;
						}
					}
				}
				else{
					for (var i = 1; i <= word[0].length; i++) {
						if (word[0][i-1].toUpperCase() == l.toUpperCase()) {
							$("#h"+i)
							.html(l);
							flag=true;
						}
					}
				}		
				if (!flag) { //harf yoksa
					var textP = document.getElementById('entered');
					if (l=="I" || l == "ı")
						textP.innerHTML = textP.innerHTML + "  ı";
					else if (l=="İ" || l == "i")
						textP.innerHTML = textP.innerHTML + "  i";
					else
						textP.innerHTML = textP.innerHTML + "  " +l.toLowerCase();
					$("#image"+imageCounter)
					.css("display","none")
					imageCounter++;
					// $("#images")
					// .css("text-align","right")
					$("#image"+imageCounter)
					.css("display","inline-block")
					if (imageCounter==10) {
						gameover();
					};
				}else { //harf varsa
					var end = true;
					for (var i = 1; i <= word[0].length; i++) {
						var divLetter = document.getElementById('h'+i).innerHTML;
						if (divLetter.length==0) 
							end = false;
					}
					if (end) 
						won();
				}
			}
		}
		function won(){
			if (language=="tr") 
				swal("İyi iş!", "Tebrikler", "success")
			else
				swal("Good job!", "Congratulations", "success")
			resetGame();
		}
		function gameover(){
			if (language=="tr") 
				sweetAlert("Oyun Bitti", "Kelime: "+ word[0], "error");
			else
				sweetAlert("Game Over", "The word: "+ word[0], "error");
			resetGame();
		}
		function resetGame(){
			imageCounter = 1;
			$("#entered")
			.html("")
			$("#image1")
				.css("display","block")
			for (var i = 2; i <=10 ; i++) {
				$("#image"+i)
				.css("display","none")
			}
			for (var i = 1; i <= 10; i++) {
				$("#h"+i)
				.html("")
				.css("display","none");
			}
			enteredLetters = [];
			gameDiv.style.display= 'none';
			levelDiv.style.display="block";
			levelDiv.classList.remove('none');
		}
		function isLetter(char){	//harf girip girmediğini kontrol eden fonksiyon
			if(char=="") return true;
			var letter_pattern = /^[a-züöçğşıİÜĞÇŞÖ\s]+$/i;
			var ok = letter_pattern.test(char); 
		    if (ok)
		        return true;
		    else 
		        return false;
		}
	})
	
	arrayTemelTurkce = [
		"accountant", "afraid", "age", "alone", "airplane", "angry", "animal", "answer", "architect", "arrive",
		"aunt", "bag", "ball", "bath", "beautiful", "bill", "body", "boil", "bookstore", "boring", "borrow",
		"boss", "bottle", "box", "brave", "bread", "break", "bridge", "brush", "build", "butter", "calculator",
		"calendar", "call", "capital", "carpenter", "carpet", "carry", "cheap", "cheese", "cherry", "chicken",
		"church", "clean", "clear", "clever", "clock", "cloud", "coat", "cold", "company", "continue", "correct",
		"country", "cow", "cry", "daily", "dark", "dentist", "difficult", "dirty", "divorced", "draw", "early",
		"earn", "elephant", "emergency", "empty", "engaged", "engineer", "enough", "eraser", "error", "fall", "far",
		"farm", "fat", "finger", "fire", "flight", "floor", "fork", "friendly", "fruit", "funny", "garden", "glass",
		"grape", "gun", "habit", "half", "hand", "handsome", "hate", "health", "hear", "heart", "heavy", "high",
		"history", "horror", "hungry", "ill", "interested", "job", "journalist", "kill", "large", "laugh", "lawyer",
		"leave", "left", "lend", "letter", "library", "lunch", "manager", "main", "map", "married", "meal", "meet",
		"meeting", "melon", "minute", "mirror", "miss", "mistake", "month", "need", "neighbour", "news", "nice", "nose",
		"nurse", "object", "opposite", "oven", "page", "paint", "parent", "pass", "pay", "pepper", "personal", "pet",
		"place", "plane", "pocket", "polite", "pool", "poor", "possible", "push", "quick", "quiet", "railway", "ready",
		"refrigerator", "remember", "rent", "repair", "repeat", "restroom", "return", "rice", "rich", "ride", "right",
		"ring", "rise", "river", "road", "roof", "room", "rose", "salt", "same", "security", "sell", "serious", "shelf",
		"ship", "shirt", "shoe", "show", "sick", "sing", "single", "skirt", "sky", "smile", "snow", "socks", "son", "song",
		"soup", "spend", "spoon", "stamp", "stay", "story", "strawberry", "strong", "successful", "suit", "sweet", "talk",
		"tall", "teach", "thick", "thief", "thin", "think", "thirsty", "ticket", "tidy", "tired", "toothbrush", "toothpaste",
		"towel", "tower", "town", "toy", "trainers", "travel", "tree", "trousers", "turn", "ugly", "umbrella", "uncle",
		"understand", "underwear", "waiter", "waitress", "wall", "watermelon", "way", "weak", "wear", "week", "wind",
		"wonderful", "winter", "word", "wrong", "zoo"];	
	arrayTemelEnglish = ["muhasebeci", "korkmuş", "yaş", "yalnız", "uçak", "kızgın", "hayvan", "cevap", "mimar", "varmak",
		"teyze", "çanta", "top", "banyo", "güzel", "fatura", "vücut", "kaynatmak", "kitapçı",
		"sıkıcı", "ödünç Almak", "patron", "şişe", "kutu", "cesur", "ekmek", "kırmak", "köprü",
		"fırçalamak", "inşa etmek", "tereyağı", "hesap", "takvim", "arama", "başkent", "marangoz",
		"halı", "taşımak", "ucuz", "peynir", "kiraz", "tavuk", "kilise", "temizlemek, temiz", "açık, net", "zeki",
		"saat", "bulut", "ceket", "soğuk", "şirket", "devam etmek", "doğru", "ülke", "inek", "ağlamak",
		"günlük", "karanlık", "dişçi", "zor", "kirli", "boşanmış", "çizmek", "erken", "kazanmak", "fil",
		"acil durum", "boş", "nişanlı", "mühendis", "yeterli", "silgi", "hata", "düşmek", "uzak", "çiftlik",
		"şişman", "parmak", "ateş", "uçuş", "zemin", "çatal", "samimi", "meyve", "komik", "bahçe", "bardak",
		"üzüm", "tabanca", "alışkanlık", "yarım", "el", "yakışıklı", "nefret", "sağlık", "duymak", "kalp",
		"ağır", "yüksek", "tarih", "korku", "aç", "hasta", "ilgili", "meslek", "gazeteci", "öldürmek", "büyük",
		"gülmek", "avukat", "ayrılmak", "sol", "ödünç vermek", "mektup", "kütüphane", "öğle yemeği", "müdür",
		"ana", "harita", "evli", "yemek", "karşılamak", "toplantı",
		"kavun", "dakika", "ayna", "kaçırmak", "hata", "ay", "gerek", "komşu", "haber", "güzel",
		"burun", "hemşire", "nesne", "karşısında, ters, zıt, karşıt", "fırın", "sayfa", "boya", "ebeveyn",
		"geçmek, geçirmek", "ödeme, ödemek", "biber", "kişisel", "evcil hayvan", "yer", "uçak", "cep", "kibar",
		"havuz", "yoksul", "mümkün", "itmek", "hızlı", "sessiz", "demiryolu", "hazır", "buzdolabı", "hatırlamak",
		"kiralamak", "onarmak", "tekrar", "tuvalet", "dönüş", "pirinç", "zengin", "binmek",
		"sağ", "halka", "artış", "nehir", "yol", "çatı", "oda", "gül", "tuz", "aynı", "güvenlik", "satmak",
		"ciddi", "raf", "gemi", "gömlek", "ayakkabı", "göstermek", "hasta", "şarkı söylemek", "tek", "etek",
		"gökyüzü", "gülümsemek", "kar", "çorap", "oğul, erkek evlat", "şarkı", "çorba", "harcamak",
		"kaşık", "kaşe", "Kalmak", "öykü", "çilek", "güçlü", "başarılı", "takım elbise", "tatlı",
		"konuşma", "uzun boylu", "öğretmek", "kalın", "hırsız", "ince", "sanmak", "susamış",
		"bilet", "düzenli", "yorgun", "diş fırçası", "diş macunu", "havlu", "kule", "kasaba", "oyuncak",
		"spor ayakkabı", "seyahat", "ağaç", "pantolon", "dönmek", "çirkin", "şemsiye", "amca, dayı",
		"anlamak", "iç çamaşırı", "garson", "kadın garson", "duvar", "karpuz", "yol", "zayıf",
		"giymek", "hafta", "rüzgar", "harika", "kış", "kelime", "yanlış", "hayvanat bahçesi"];

function Easy(){
	let index=Math.floor(Math.random() * 30)
	if (language=="tr") {
		return [arrayTemelTurkce[index],arrayTemelEnglish[index]];
	}
	else{
		return [arrayTemelEnglish[index],arrayTemelTurkce[index]];
	}
	
}

function Medium(){
	let index=Math.floor(Math.random() * 30)
	if (language=="tr") {
		return [arrayTemelTurkce[index],arrayTemelEnglish[index]];
	}
	else{
		return [arrayTemelEnglish[index],arrayTemelTurkce[index]];
	}
	
}
function Hard(){
	let index=Math.floor(Math.random() * 30)
	if (language=="tr") {
		return [arrayTemelTurkce[index],arrayTemelEnglish[index]];
	}
	else{
		return [arrayTemelEnglish[index],arrayTemelTurkce[index]];
	}
	
}

	