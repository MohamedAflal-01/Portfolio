import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCV() {
  const pdfDoc = await PDFDocument.create();

  // Fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const PAGE_WIDTH = 595.28; // Standard A4 width in points
  const PAGE_HEIGHT = 841.89; // Standard A4 height in points
  const MARGIN = 50;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

  const colorBlack = rgb(0.08, 0.08, 0.08);
  const colorLine = rgb(0.78, 0.78, 0.78);

  // Helper to wrap text into lines based on max width
  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  let page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - 45;

  // Header - Name
  const nameText = 'RAFAIDEEN MOHAMED AFLAL';
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 20);
  page1.drawText(nameText, {
    x: (PAGE_WIDTH - nameWidth) / 2,
    y,
    size: 20,
    font: fontBold,
    color: colorBlack,
  });
  y -= 20;

  // Header - Title
  const titleText = 'SOFTWARE ENGINEERING UNDERGRADUATE';
  const titleWidth = fontRegular.widthOfTextAtSize(titleText, 10);
  page1.drawText(titleText, {
    x: (PAGE_WIDTH - titleWidth) / 2,
    y,
    size: 10,
    font: fontRegular,
    color: colorBlack,
  });
  y -= 18;

  // Header - Contact line 1 (Phone & LinkedIn)
  const contactLine1 = '+94 768805396        linkedin.com/in/mohamedaflal01';
  const cWidth1 = fontRegular.widthOfTextAtSize(contactLine1, 9.5);
  page1.drawText(contactLine1, {
    x: (PAGE_WIDTH - cWidth1) / 2,
    y,
    size: 9.5,
    font: fontRegular,
    color: colorBlack,
  });
  y -= 14;

  // Header - Contact line 2 (Email)
  const emailText = 'rafaideenmuhammadaflalmuhammed@gmail.com';
  const emailWidth = fontRegular.widthOfTextAtSize(emailText, 9.5);
  page1.drawText(emailText, {
    x: (PAGE_WIDTH - emailWidth) / 2,
    y,
    size: 9.5,
    font: fontRegular,
    color: colorBlack,
  });
  y -= 26;

  // Helper for Section Headings
  function drawSectionHeading(page, title, currentY, withLine = false) {
    page.drawText(title, {
      x: MARGIN,
      y: currentY,
      size: 13,
      font: fontBold,
      color: colorBlack,
    });
    if (withLine) {
      page.drawLine({
        start: { x: MARGIN, y: currentY - 4 },
        end: { x: PAGE_WIDTH - MARGIN, y: currentY - 4 },
        thickness: 0.75,
        color: colorLine,
      });
      return currentY - 18;
    }
    return currentY - 14;
  }

  // Section: Profile
  y = drawSectionHeading(page1, 'Profile', y);
  const profileParagraph =
    'Motivated and detail-oriented Software Engineering student currently pursuing an HND in Computing, with a strong interest in C# application development and database-driven software solutions. Possess practical knowledge of C#, .NET, SQL, MySQL, JavaScript, HTML, CSS and Visual Studio, with experience developing software projects involving database management, user interfaces and system functionality. Strong understanding of object-oriented programming, SQL queries, database design, debugging and problem-solving. Eager to apply technical knowledge in a professional development environment, contribute to high-quality software solutions and continuously develop expertise in C#/.NET application development, MySQL, APIs and enterprise software systems.';

  const profileLines = wrapText(profileParagraph, fontRegular, 9.5, CONTENT_WIDTH);
  for (const line of profileLines) {
    page1.drawText(line, {
      x: MARGIN,
      y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
      lineHeight: 13,
    });
    y -= 13;
  }
  y -= 14;

  // Section: Education
  y = drawSectionHeading(page1, 'Education', y);

  // Education 1
  page1.drawText('HND in Computing (Software Engineering)', {
    x: MARGIN,
    y,
    size: 10,
    font: fontBold,
    color: colorBlack,
  });
  const eduDate1 = 'Oct 2025 – Present';
  const eduDate1W = fontRegular.widthOfTextAtSize(eduDate1, 9.5);
  page1.drawText(eduDate1, {
    x: PAGE_WIDTH - MARGIN - eduDate1W,
    y,
    size: 9.5,
    font: fontRegular,
    color: colorBlack,
  });
  y -= 13;

  page1.drawText('Esoft Metro Campus', {
    x: MARGIN,
    y,
    size: 9.5,
    font: fontItalic,
    color: colorBlack,
  });
  const eduLoc1 = 'Batticaloa, Eastern Province';
  const eduLoc1W = fontItalic.widthOfTextAtSize(eduLoc1, 9.5);
  page1.drawText(eduLoc1, {
    x: PAGE_WIDTH - MARGIN - eduLoc1W,
    y,
    size: 9.5,
    font: fontItalic,
    color: colorBlack,
  });
  y -= 18;

  // Education 2
  page1.drawText('Diploma in Information Technology', {
    x: MARGIN,
    y,
    size: 10,
    font: fontBold,
    color: colorBlack,
  });
  const eduDate2 = 'Jan 2025 – Sep 2025';
  const eduDate2W = fontRegular.widthOfTextAtSize(eduDate2, 9.5);
  page1.drawText(eduDate2, {
    x: PAGE_WIDTH - MARGIN - eduDate2W,
    y,
    size: 9.5,
    font: fontRegular,
    color: colorBlack,
  });
  y -= 13;

  page1.drawText('Esoft Metro Campus', {
    x: MARGIN,
    y,
    size: 9.5,
    font: fontItalic,
    color: colorBlack,
  });
  const eduLoc2 = 'Batticaloa, Eastern Province';
  const eduLoc2W = fontItalic.widthOfTextAtSize(eduLoc2, 9.5);
  page1.drawText(eduLoc2, {
    x: PAGE_WIDTH - MARGIN - eduLoc2W,
    y,
    size: 9.5,
    font: fontItalic,
    color: colorBlack,
  });
  y -= 22;

  // Section: Projects
  y = drawSectionHeading(page1, 'Projects', y);

  const projects = [
    {
      title: 'Pharmacy Inventory Management System - Ongoing | C#, .NET, SQL',
      date: 'Aug. 2026 – Present',
      bullets: [
        'Currently developing a database-driven pharmacy inventory system for managing medicines, suppliers, stock levels and inventory records.',
        'Designing and implementing CRUD functionalities for adding, updating, searching and managing medicine information.',
        'Developing database operations using C# and SQL to improve inventory tracking and efficient data management.',
      ],
    },
    {
      title: 'Automated Gym Fee Calculation System | C#, .NET, SQL Server',
      date: 'Apr. 2026 – May. 2026',
      bullets: [
        'Developed an automated system for calculating gym membership fees based on membership plans and customer details.',
        'Implemented membership management, fee calculation and payment record functionalities.',
        'Applied C# programming and database concepts to improve calculation accuracy and reduce manual processing.',
      ],
    },
    {
      title: 'Restaurant Order Management System | C#, .NET, SQL',
      date: 'Apr. 2026 – May. 2026',
      bullets: [
        'Developed a restaurant management system for handling customer orders, menu items, and order information.',
        'Implemented order processing, menu management, quantity handling and automated bill calculations.',
        'Used C#, SQL and Visual Studio to develop database-driven application functionalities.',
      ],
    },
    {
      title: 'Billing System for Hardware | C#, .NET, MySQL',
      date: 'Jan. 2026 – Feb. 2026',
      bullets: [
        'Developed a billing system for managing hardware products, customer transactions and billing records.',
        'Implemented product selection, quantity management, total calculation and bill generation functionalities.',
        'Applied C# and database development concepts to create an efficient and user-friendly billing solution.',
      ],
    },
  ];

  for (const proj of projects) {
    // Project header
    page1.drawText(proj.title, {
      x: MARGIN,
      y,
      size: 9.8,
      font: fontBold,
      color: colorBlack,
    });
    const projDateW = fontRegular.widthOfTextAtSize(proj.date, 9.2);
    page1.drawText(proj.date, {
      x: PAGE_WIDTH - MARGIN - projDateW,
      y,
      size: 9.2,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 13;

    // Bullets
    for (const b of proj.bullets) {
      // Bullet dot
      page1.drawText('•', {
        x: MARGIN + 10,
        y,
        size: 9,
        font: fontRegular,
        color: colorBlack,
      });

      const bulletLines = wrapText(b, fontRegular, 9.2, CONTENT_WIDTH - 24);
      for (let i = 0; i < bulletLines.length; i++) {
        page1.drawText(bulletLines[i], {
          x: MARGIN + 22,
          y,
          size: 9.2,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 12;
      }
    }
    y -= 5;
  }

  // ==========================================
  // PAGE 2
  // ==========================================
  let page2 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  y = PAGE_HEIGHT - 50;

  // Section: Technical Skills
  y = drawSectionHeading(page2, 'Technical Skills', y, true);

  const techSkills = [
    { label: 'Languages', value: 'C#, SQL, JavaScript, HTML5, CSS3' },
    { label: 'Frameworks', value: '.NET, ASP.NET, Bootstrap, Tailwind CSS' },
    { label: 'Databases', value: 'SQL Server, MySQL' },
    { label: 'Tools', value: 'Visual Studio, VS Code, Git, GitHub, Postman, Figma' },
    { label: 'Development', value: 'OOP, CRUD, REST APIs, Debugging, Troubleshooting' },
  ];

  for (const skill of techSkills) {
    page2.drawText('•', {
      x: MARGIN + 10,
      y,
      size: 10,
      font: fontRegular,
      color: colorBlack,
    });

    const labelText = `${skill.label}: `;
    page2.drawText(labelText, {
      x: MARGIN + 24,
      y,
      size: 9.8,
      font: fontBold,
      color: colorBlack,
    });

    const labelW = fontBold.widthOfTextAtSize(labelText, 9.8);
    page2.drawText(skill.value, {
      x: MARGIN + 24 + labelW,
      y,
      size: 9.8,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;
  }

  y -= 15;

  // Section: Core Competencies
  y = drawSectionHeading(page2, 'Core Competencies', y, true);

  const competencies = [
    'Communication',
    'Teamwork & Collaboration',
    'Problem-Solving',
    'Time Management',
    'Adaptability',
    'Willingness to Learn',
    'Attention to Detail',
    'Critical Thinking',
  ];

  for (const comp of competencies) {
    page2.drawText('•', {
      x: MARGIN + 10,
      y,
      size: 10,
      font: fontRegular,
      color: colorBlack,
    });

    page2.drawText(comp, {
      x: MARGIN + 24,
      y,
      size: 9.8,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve(__dirname, '../public/cv.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated CV at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateCV().catch((err) => {
  console.error('Error generating CV:', err);
  process.exit(1);
});
