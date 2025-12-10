
document.addEventListener("DOMContentLoaded", () => {
    const skillFills = document.querySelectorAll(".skill-fill");
    const sections = document.querySelectorAll("section");

    // Reset skill bars
    skillFills.forEach(fill => fill.style.width = "0");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute("data-skill");
                entry.target.style.width = skillLevel + "%";
            } else {
                entry.target.style.width = "0";
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));

    // Active section tracking (desktop only)
    function updateActiveSection() {
        if (window.innerWidth <= 768) return; // skip on mobile
        let scrollPos = window.scrollX + window.innerWidth / 2;
        sections.forEach(section => {
            let sectionCenter = section.offsetLeft + section.offsetWidth / 2;
            let distance = Math.abs(scrollPos - sectionCenter);
            if (distance < section.offsetWidth / 2) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }

    // Resize sections for desktop & mobile
    function resizeSections() {
        if (window.innerWidth > 768) {
            // Desktop horizontal scroll
            sections.forEach(section => {
                section.style.minWidth = `${window.innerWidth}px`;
                section.style.height = `${window.innerHeight}px`;
            });
        } else {
            // Mobile vertical scroll
            sections.forEach(section => {
                section.style.minWidth = "100%";
                section.style.height = "auto";
            });
        }
    }

    // Smooth scroll (desktop horizontal, mobile vertical)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            if (window.innerWidth > 768) {
                // Desktop horizontal scroll
                window.scrollTo({
                    left: target.offsetLeft,
                    behavior: "smooth"
                });
            } else {
                // Mobile vertical scroll
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Attach events
    window.addEventListener("resize", resizeSections);
    window.addEventListener("scroll", updateActiveSection);

    // Initial run
    resizeSections();
    updateActiveSection();
});
