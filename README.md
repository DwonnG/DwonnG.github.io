# Portfolio — Dwonn Goodwin

Personal site for QA, test automation, and platform quality engineering.

**Live site:** https://dwonng.github.io/

## Local preview

```bash
cd /Users/dwgoodwi/Code/playground/dwgoodwi.github.io
python3 -m http.server 8080
```

Open http://localhost:8080/

## Update resume PDF

The **Download Resume** button serves `DwonnGoodwinResume.pdf` from the repo root:

```bash
cp /path/to/your/latest-resume.pdf DwonnGoodwinResume.pdf
git add DwonnGoodwinResume.pdf
git commit -m "Update resume PDF"
git push
```

## Customize links

Edit `index.html` if contact URLs change:

- LinkedIn: https://www.linkedin.com/in/dwonngoodwin/
- GitHub: https://github.com/DwonnG
- Email: DwonnGoodwin@gmail.com

## Related repos

- [qa-mcp-server](https://github.com/DwonnG/qa-mcp-server) — MCP integrations for Jira, GitHub, Jenkins, AWS
- [qa-agent-skills](https://github.com/DwonnG/qa-agent-skills) — Agent skills for QA workflows
- [qa-automation-lab](https://github.com/DwonnG/qa-automation-lab) - Multi-framework test automation lab
