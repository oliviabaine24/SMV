/* ================================================================
   SmartMoney Group — Site Chrome
   Renders the header + footer "components" on every page and wires
   up the interactive bits (mobile nav, active link, newsletter).
   Kept as shared JS modules so every page stays in lockstep with a
   single source of truth for nav + footer — the vanilla-JS analogue
   of a Next.js <Header/> and <Footer/>.
   ================================================================ */
(function(){

  var NAV = [
    { label:'About',        href:'about.html' },
    { label:'Intelligence', href:'intelligence.html' },
    { label:'Education',    href:'education.html' },
    { label:'Media',        href:'media.html' },
    { label:'Contact',      href:'contact.html' }
  ];

  function headerHTML(){
    var links = NAV.map(function(n){
      var active = (n.href === (window.SMG_PAGE || '')) ? ' class="active"' : '';
      return '<li><a href="'+n.href+'"'+active+'>'+n.label+'</a></li>';
    }).join('');
    return ''
    + '<div class="container nav-row">'
    + '  <a class="logo" href="index.html">SmartMoney <em>Group</em></a>'
    + '  <nav>'
    + '    <ul class="nav-links" id="navLinks">' + links + '</ul>'
    + '  </nav>'
    + '  <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">'
    + '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
    + '  </button>'
    + '</div>';
  }

  function footerHTML(){
    return ''
    + '<div class="container">'
    + '  <div class="footer-top">'
    + '    <div class="footer-brand">'
    + '      <a class="logo" href="index.html">SmartMoney <em>Group</em></a>'
    + '      <p>Building stronger venture ecosystems through intelligence, storytelling, and education — a catalyst for connection across the Heartland.</p>'
    + '      <form class="newsletter-form" id="footerNewsletter">'
    + '        <label class="visually-hidden" for="footerEmail">Email address</label>'
    + '        <input type="email" id="footerEmail" placeholder="you@company.com" required>'
    + '        <button class="btn btn-gold" type="submit">Join</button>'
    + '      </form>'
    + '      <p class="form-note" id="footerNewsNote">Podcast newsletter + SubStack, free tier.</p>'
    + '    </div>'
    + '    <div class="footer-col"><h4>About</h4><ul>'
    + '      <li><a href="about.html#mission">Mission</a></li>'
    + '      <li><a href="about.html#vision">Vision</a></li>'
    + '      <li><a href="about.html#team">Team</a></li>'
    + '      <li><a href="about.html#partners">Partners</a></li>'
    + '      <li><a href="about.html#speaking">Speaking</a></li>'
    + '    </ul></div>'
    + '    <div class="footer-col"><h4>Intelligence</h4><ul>'
    + '      <li><a href="https://www.ohioventurepipeline.com" target="_blank" rel="noopener">Ohio Venture Pipeline</a></li>'
    + '      <li><a href="https://www.ohioventurepipeline.com/all-stars" target="_blank" rel="noopener">OVP All-Stars</a></li>'
    + '      <li><a href="intelligence.html#reports">State &amp; Regional Reports</a></li>'
    + '      <li><a href="intelligence.html#reports">Industry Reports</a></li>'
    + '    </ul></div>'
    + '    <div class="footer-col"><h4>Media</h4><ul>'
    + '      <li><a href="media.html#episodes">Episodes</a></li>'
    + '      <li><a href="media.html#episodes">Guests</a></li>'
    + '      <li><a href="media.html#episodes">Topics</a></li>'
    + '      <li><a href="media.html#sponsors">Sponsors</a></li>'
    + '      <li><a href="media.html#newsletter">Newsletter</a></li>'
    + '      <li><a href="media.html#newsletter">SubStack</a></li>'
    + '    </ul></div>'
    + '    <div class="footer-col"><h4>Education</h4><ul>'
    + '      <li><a href="education.html#programs">DealMaker Academy</a></li>'
    + '      <li><a href="education.html#programs">Fast Track Fundraising</a></li>'
    + '      <li><a href="education.html#resources">Resources</a></li>'
    + '      <li><a href="education.html#resources">Playbooks &amp; Guides</a></li>'
    + '    </ul></div>'
    + '  </div>'
    + '  <div class="footer-bottom">'
    + '    <span>&copy; <span id="yearNow"></span> SmartMoney Group. A catalyst for connection across the Heartland.</span>'
    + '    <div class="footer-social">'
    + '      <a href="contact.html">Contact</a>'
    + '      <a href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a>'
    + '      <a href="#" onclick="return false;">SubStack</a>'
    + '    </div>'
    + '  </div>'
    + '</div>';
  }

  function mount(){
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if(h) h.innerHTML = headerHTML();
    if(f) f.innerHTML = footerHTML();

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if(toggle && links){
      toggle.addEventListener('click', function(){
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ links.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
      });
    }

    var yr = document.getElementById('yearNow');
    if(yr) yr.textContent = new Date().getFullYear();

    var nf = document.getElementById('footerNewsletter');
    if(nf){
      nf.addEventListener('submit', function(e){
        e.preventDefault();
        var note = document.getElementById('footerNewsNote');
        var email = document.getElementById('footerEmail').value;
        if(note){ note.textContent = "You're in, " + email + " — welcome to the newsletter + SubStack."; }
        nf.reset();
      });
    }

    // fade-up reveal for anything marked [data-reveal]
    var reveal = document.querySelectorAll('[data-reveal]');
    if('IntersectionObserver' in window && reveal.length){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { threshold:.15 });
      reveal.forEach(function(el){ io.observe(el); });
    } else {
      reveal.forEach(function(el){ el.classList.add('is-visible'); });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else { mount(); }
})();
