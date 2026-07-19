/* ================================================================
   SmartMoney Group — Homepage interactivity
   ================================================================ */
(function(){

  /* ---------- 1. rotating "Serving ___ across the Heartland" ---------- */
  var AUDIENCES = ['FOUNDERS','INVESTORS','UNIVERSITIES','INNOVATION LEADERS'];
  var rot = document.getElementById('heroRotator');
  if(rot){
    var i = 0;
    setInterval(function(){
      i = (i+1) % AUDIENCES.length;
      rot.style.opacity = 0;
      setTimeout(function(){ rot.textContent = AUDIENCES[i]; rot.style.opacity = 1; }, 260);
    }, 2400);
  }

  /* ---------- 2. animated "At a Glance" counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'),10) : 0;
    var dur = 1500, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = prefix + val.toLocaleString(undefined, {minimumFractionDigits:decimals, maximumFractionDigits:decimals}) + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && counters.length){
    var cIo = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ animateCount(en.target); cIo.unobserve(en.target); }
      });
    }, { threshold:.6 });
    counters.forEach(function(c){ cIo.observe(c); });
  }

  /* ---------- 3. "I am a..." audience selector ---------- */
  var AUD_COPY = {
    student: "You’ll get the Heartland’s deal flow, All-Star profiles, and the DealMaker Academy curriculum built for people who want a seat in venture before they graduate.",
    founder: "You’ll get quarterly capital-flow intelligence, warm paths to investors tracking your sector, and the fundraising playbooks that shorten your next raise.",
    investor: "You’ll get first look at the companies our Intelligence desk is tracking across the Heartland, plus the All-Stars rankings before they publish.",
    advisor: "You’ll get the briefings and reports your clients ask about first — capital flows, sector reports, and the stories behind the biggest raises.",
    university: "You’ll get regional venture data for your tech-transfer and entrepreneurship programs, plus speaking and partnership opportunities."
  };
  var chips = document.querySelectorAll('.aud-chip');
  var audText = document.getElementById('audCopy');
  var audForm = document.getElementById('audForm');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); c.setAttribute('aria-selected','false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-selected','true');
      var key = chip.getAttribute('data-aud');
      if(audText){ audText.style.opacity = 0; setTimeout(function(){ audText.textContent = AUD_COPY[key]; audText.style.opacity = 1; }, 200); }
      if(audForm){ audForm.setAttribute('data-selected', key); }
    });
  });
  if(audForm){
    audForm.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.getElementById('audNote');
      var email = document.getElementById('audEmail').value;
      var who = audForm.getAttribute('data-selected') || 'friend';
      if(note){ note.textContent = "Welcome, " + who + " — check your inbox (" + email + ") to confirm the podcast newsletter + SubStack free tier."; }
      audForm.reset();
    });
  }

  /* ---------- 4. Latest section tabs (visual only, filters cards) ---------- */
  var latestTabs = document.querySelectorAll('.latest-tab');
  var latestCards = document.querySelectorAll('.latest-card');
  latestTabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      latestTabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var key = tab.getAttribute('data-filter');
      latestCards.forEach(function(card){
        var show = key === 'all' || card.getAttribute('data-type') === key;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- 5. Instant Insights looping strip: pause on hover ---------- */
  var track = document.getElementById('insightsTrack');
  if(track){
    track.addEventListener('mouseenter', function(){ track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', function(){ track.style.animationPlayState = 'running'; });
  }

})();
