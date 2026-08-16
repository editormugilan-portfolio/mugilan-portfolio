$footer = @"
  <div class="footer-reveal-container">
    <footer class="cinematic-footer" id="cinematic-footer">
      <div class="footer-aurora"></div>
      <div class="footer-bg-grid"></div>
      <div class="footer-giant-bg-text">MUGILAN</div>

      <div class="footer-marquee-container">
        <div class="footer-marquee-track">
          <div class="footer-marquee-item">
            <span>Premium Editorial</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Aesthetic Color Grading</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Seamless Transitions</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Scroll-Stopping</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Social Storytelling</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
          </div>
          <div class="footer-marquee-item">
            <span>Premium Editorial</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Aesthetic Color Grading</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Seamless Transitions</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Scroll-Stopping</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
            <span>Social Storytelling</span> <span style="color: rgba(255,255,255,0.3)">✦</span>
          </div>
        </div>
      </div>

      <div class="footer-main-content">
        <h2 class="footer-heading footer-stagger">LET'S CREATE</h2>
        <div class="footer-links-wrapper footer-stagger">
          <div class="footer-primary-links">
            <a href="mailto:smugilan037@gmail.com" class="footer-glass-pill magnetic-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email Me
            </a>
            <a href="https://wa.me/918667052739" target="_blank" class="footer-glass-pill magnetic-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              WhatsApp
            </a>
            <a href="https://www.instagram.com/itz._.mugilan_" target="_blank" class="footer-glass-pill magnetic-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Follow Me
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom-bar footer-stagger">
        <div class="footer-credits">itz._.mugilan_</div>
        <div class="footer-crafted-badge">
          <img src="IMG_4782.JPG.jpeg" class="headshot-mini" alt="Mugilan">
          <span>Available for Freelance</span>
          <span class="animate-heartbeat">✦</span>
        </div>
        <button class="footer-scroll-top magnetic-btn" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </div>
    </footer>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
"@

$files = Get-ChildItem -Path "D:\app files\VASD-VELURYN AGNECY\VA WEB\Draft\MUG" -Filter "*.html"
foreach ($f in $files) {
    if ($f.Name -match "^(project|timeline)-\d\.html$") {
        $content = Get-Content $f.FullName -Raw
        
        # Check if it has a footer-reveal-container
        if ($content -match '<div class="footer-reveal-container">') {
            # Regex to replace everything from the footer container to the end
            $content = $content -replace '(?s)<div class="footer-reveal-container">.*', $footer
        } else {
            # Just append after </main>
            $content = $content -replace '(?s)</main>.*', "</main>`r`n$footer"
        }
        
        Set-Content -Path $f.FullName -Value $content
        Write-Host "Fixed footer in $($f.Name)"
    }
}
