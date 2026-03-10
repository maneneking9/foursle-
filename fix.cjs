const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/lib/api.ts');
let content = fs.readFileSync(file, 'utf8');

// replace all "return res.json();" with "return await res.json();"
content = content.replace(/return res\.json\(\);/g, 'return await res.json();');

// check for getAdminTestimonies specifically and add try-catch
content = content.replace(
  /getAdminTestimonies: async \(\) => \{\s+const res = await safeFetch\(\`\$\{API_URL\}\/api\/admin\/testimonies\`\);\s+return await res\.json\(\);\s+\},/g,
  `getAdminTestimonies: async () => {
    try {
      const res = await safeFetch(\`\$\{API_URL\}/api/admin/testimonies\`);
      return await res.json();
    } catch {
      return [];
    }
  },`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed api.ts');
