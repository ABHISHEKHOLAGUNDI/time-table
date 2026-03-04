const fs = require('fs');
const file = 'c:\\Users\\abhis\\Desktop\\my time table website\\app.js';
let content = fs.readFileSync(file, 'utf8');

// replace local variable supabase with supabaseClient
content = content.replace(/let supabase = null;/g, 'let supabaseClient = null;');
content = content.replace(/supabase = window\.supabase\.createClient/g, 'supabaseClient = window.supabase.createClient');
content = content.replace(/if \(!supabase\)/g, 'if (!supabaseClient)');
content = content.replace(/if \(block && supabase\)/g, 'if (block && supabaseClient)');
content = content.replace(/if \(supabase\)/g, 'if (supabaseClient)');
content = content.replace(/await supabase(?!\.)/g, 'await supabaseClient');
content = content.replace(/await supabase\.from/g, 'await supabaseClient.from');

fs.writeFileSync(file, content);
console.log('Done!');
