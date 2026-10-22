export interface AccentureQuestion {
  id: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium';
  timeEstimate: string;
  instructions: {
    context: string;
    objectives: string[];
    constraints: string[];
  };
  starterCode: string;
  solutionCode: string;
  missingJsLines: string[];
  learningGuide: {
    logicSteps: string[];
    jsConcepts: string[];
    accentureTip: string;
  };
  testSuite: (iframeDoc: Document, iframeWin: Window) => { passed: boolean; message: string; details: string[] };
}

export const ACCENTURE_QUESTIONS: AccentureQuestion[] = [
  {
    id: 1,
    title: 'Search Filter for Products with Data Attributes',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '5 mins',
    instructions: {
      context: 'You are developing a search filter for a new website. The setup is incomplete, and you need to finalize it correctly.',
      objectives: [
        'Add 5 list elements (fruits or vegetables) in the unordered list with the class `product` and attribute `data-name` which will contain their search tags.',
        'Set the initial search value to `"nana"`.',
        'Implement code to display a product if the search input is part of its name; otherwise, hide the product using CSS styles.',
        'Set the font size of list items to `25px`.'
      ],
      constraints: [
        'Do not change the id or class attributes of any elements, as they are used by the JavaScript code.',
        'Ensure that the styling follows the provided CSS correctly.'
      ]
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; }
    #search-input { padding: 8px 12px; font-size: 1rem; margin-bottom: 15px; width: 280px; border-radius: 4px; border: 1px solid #ccc; }
    ul { list-style-type: square; padding-left: 24px; }
    
    /* TODO: Set font size of list items to 25px */
    .product {
      font-size: 25px;
      margin: 6px 0;
    }
  </style>
</head>
<body>
  <h2>Product Search Filter</h2>
  <input type="text" id="search-input" placeholder="Search products...">
  
  <ul id="product-list">
    <!-- Objective: 5 list elements with class "product" and "data-name" -->
    <li class="product" data-name="banana">Banana</li>
    <li class="product" data-name="pineapple">Pineapple</li>
    <li class="product" data-name="apple">Apple</li>
    <li class="product" data-name="mango">Mango</li>
    <li class="product" data-name="orange">Orange</li>
  </ul>

  <script>
    const searchInput = document.getElementById('search-input');
    const products = document.querySelectorAll('.product');

    // Objective: Set initial search value to "nana"
    searchInput.value = "nana";

    function filterProducts() {
      const query = searchInput.value.toLowerCase();

      // TODO: Write 4 lines to show product if search query is in data-name/name, else hide
      
    }

    searchInput.addEventListener('input', filterProducts);
    filterProducts(); // Initial filter run
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; }
    #search-input { padding: 8px 12px; font-size: 1rem; margin-bottom: 15px; width: 280px; border-radius: 4px; border: 1px solid #ccc; }
    ul { list-style-type: square; padding-left: 24px; }
    
    .product {
      font-size: 25px;
      margin: 6px 0;
    }
  </style>
</head>
<body>
  <h2>Product Search Filter</h2>
  <input type="text" id="search-input" placeholder="Search products...">
  
  <ul id="product-list">
    <li class="product" data-name="banana">Banana</li>
    <li class="product" data-name="pineapple">Pineapple</li>
    <li class="product" data-name="apple">Apple</li>
    <li class="product" data-name="mango">Mango</li>
    <li class="product" data-name="orange">Orange</li>
  </ul>

  <script>
    const searchInput = document.getElementById('search-input');
    const products = document.querySelectorAll('.product');

    searchInput.value = "nana";

    function filterProducts() {
      const query = searchInput.value.toLowerCase();
      products.forEach(item => {
        const name = (item.getAttribute('data-name') || item.textContent).toLowerCase();
        if (name.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    searchInput.addEventListener('input', filterProducts);
    filterProducts();
  </script>
</body>
</html>`,
    missingJsLines: [
      `products.forEach(item => {`,
      `  const name = (item.getAttribute('data-name') || item.textContent).toLowerCase();`,
      `  item.style.display = name.includes(query) ? '' : 'none';`,
      `});`
    ],
    learningGuide: {
      logicSteps: [
        'Set initial input value: `searchInput.value = "nana"`.',
        'Add 5 list items with `class="product"` and `data-name="fruitname"`.',
        'In `filterProducts()`, get input query: `query = searchInput.value.toLowerCase()`.',
        'Loop items: `products.forEach(item => ...)`',
        'Extract search tag: `item.getAttribute("data-name").toLowerCase()`.',
        'Toggle display style: `item.style.display = name.includes(query) ? "" : "none"`.',
        'CSS rule: `.product { font-size: 25px; }`.'
      ],
      jsConcepts: ['`getAttribute("data-name")`', '`string.includes(query)`', '`style.display = "none"`', 'CSS font-size specification'],
      accentureTip: 'Exact question from Accenture Campus Hiring 2025! Make sure initial search input value is set to "nana" so Banana & Pineapple remain visible while others are hidden.'
    },
    testSuite: (doc) => {
      const input = doc.getElementById('search-input') as HTMLInputElement;
      const products = doc.querySelectorAll('.product');

      if (!input || products.length < 5) {
        return {
          passed: false,
          message: 'Failed element requirements.',
          details: [`Need #search-input and at least 5 list items with class .product. Found: ${products.length} items.`]
        };
      }

      const details: string[] = [];
      let passedCount = 0;

      if (input.value === 'nana') {
        details.push('✅ Initial search input value "nana": PASSED');
        passedCount++;
      } else {
        details.push(`❌ Initial search value expected "nana", got "${input.value}"`);
      }

      let visibleCount = 0;
      products.forEach((el: Element) => {
        if ((el as HTMLElement).style.display !== 'none') visibleCount++;
      });

      if (visibleCount === 2) {
        details.push('✅ "nana" filter matching (Banana & Pineapple visible, 3 hidden): PASSED');
        passedCount++;
      } else {
        details.push(`❌ Filter matching test: expected 2 visible items for "nana", got ${visibleCount}`);
      }

      return {
        passed: passedCount >= 2,
        message: passedCount >= 2 ? 'Search filter solution passed all Accenture 2025 specs!' : 'Search filter tests failed.',
        details
      };
    }
  },
  {
    id: 2,
    title: 'Interactive Counter with Limit',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '5 mins',
    instructions: {
      context: 'Modify the provided JavaScript code for an interactive counter with limits.',
      objectives: [
        'The Increment button (`#inc-btn`) increases the count, but cannot exceed 10.',
        'The Decrement button (`#dec-btn`) decreases the count, but cannot go below 0.',
        'Update the paragraph with ID `status-msg` to show "Maximum limit reached!" when count is 10, and "Minimum limit reached!" when count is 0. Otherwise, keep it empty.'
      ],
      constraints: [
        'Do not alter element IDs (#inc-btn, #dec-btn, #status-msg).'
      ]
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding-top: 20px; background: #ffffff; color: #18181b; }
    button { padding: 8px 16px; margin: 6px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; font-weight: bold; background: #f4f4f5; color: #18181b; }
    button:hover { background: #e4e4e7; }
    #count { font-weight: bold; font-size: 1.5rem; color: #0284c7; }
    #status-msg { color: #dc2626; font-size: 0.9rem; margin-top: 10px; height: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Counter: <span id="count">0</span></h2>
  <button id="inc-btn">Increment</button>
  <button id="dec-btn">Decrement</button>
  <p id="status-msg"></p>

  <script>
    let count = 0;
    const countEl = document.getElementById('count');
    const msgEl = document.getElementById('status-msg');

    document.getElementById('inc-btn').addEventListener('click', () => {
      // TODO: Write 4 lines for Increment with max limit 10
      
    });

    document.getElementById('dec-btn').addEventListener('click', () => {
      // TODO: Write 4 lines for Decrement with min limit 0
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding-top: 20px; background: #ffffff; color: #18181b; }
    button { padding: 8px 16px; margin: 6px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; font-weight: bold; background: #f4f4f5; color: #18181b; }
    button:hover { background: #e4e4e7; }
    #count { font-weight: bold; font-size: 1.5rem; color: #0284c7; }
    #status-msg { color: #dc2626; font-size: 0.9rem; margin-top: 10px; height: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Counter: <span id="count">0</span></h2>
  <button id="inc-btn">Increment</button>
  <button id="dec-btn">Decrement</button>
  <p id="status-msg"></p>

  <script>
    let count = 0;
    const countEl = document.getElementById('count');
    const msgEl = document.getElementById('status-msg');

    document.getElementById('inc-btn').addEventListener('click', () => {
      if (count < 10) {
        count++;
        countEl.textContent = count;
        msgEl.textContent = count === 10 ? "Maximum limit reached!" : "";
      }
    });

    document.getElementById('dec-btn').addEventListener('click', () => {
      if (count > 0) {
        count--;
        countEl.textContent = count;
        msgEl.textContent = count === 0 ? "Minimum limit reached!" : "";
      }
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `if (count < 10) {`,
      `  count++;`,
      `  countEl.textContent = count;`,
      `  msgEl.textContent = count === 10 ? "Maximum limit reached!" : "";`,
      `}`
    ],
    learningGuide: {
      logicSteps: [
        'Check boundary conditions: `if (count < 10)` for increment and `if (count > 0)` for decrement.',
        'Update `count` variable using `count++` or `count--`.',
        'Update DOM display using `countEl.textContent = count;`.',
        'Use ternary operator `count === 10 ? "Maximum limit reached!" : ""` to update `#status-msg` text.'
      ],
      jsConcepts: ['`addEventListener("click", ...)`', 'DOM manipulation with `textContent`', 'Conditional statements (`if/else`)', 'Ternary operators'],
      accentureTip: 'Accenture tests exact string matches! Ensure "Maximum limit reached!" and "Minimum limit reached!" match casing and punctuation 100%.'
    },
    testSuite: (doc) => {
      const incBtn = doc.getElementById('inc-btn');
      const decBtn = doc.getElementById('dec-btn');
      const countEl = doc.getElementById('count');
      const msgEl = doc.getElementById('status-msg');

      if (!incBtn || !decBtn || !countEl || !msgEl) {
        return { passed: false, message: 'Required HTML elements not found.', details: ['Missing #inc-btn, #dec-btn, #count, or #status-msg'] };
      }

      const details: string[] = [];
      let passedCount = 0;

      for (let i = 0; i < 10; i++) incBtn.click();
      if (countEl.textContent?.trim() === '10' && msgEl.textContent?.trim() === 'Maximum limit reached!') {
        details.push('✅ Increment to 10 & Max Limit Msg: PASSED');
        passedCount++;
      } else {
        details.push(`❌ Max limit test: expected count=10 and msg="Maximum limit reached!", got count=${countEl.textContent} msg="${msgEl.textContent}"`);
      }

      incBtn.click();
      if (countEl.textContent?.trim() === '10') {
        details.push('✅ Cap count at 10: PASSED');
        passedCount++;
      } else {
        details.push(`❌ Exceeded max limit: count became ${countEl.textContent}`);
      }

      for (let i = 0; i < 10; i++) decBtn.click();
      if (countEl.textContent?.trim() === '0' && msgEl.textContent?.trim() === 'Minimum limit reached!') {
        details.push('✅ Decrement to 0 & Min Limit Msg: PASSED');
        passedCount++;
      } else {
        details.push(`❌ Min limit test: expected count=0 and msg="Minimum limit reached!", got count=${countEl.textContent} msg="${msgEl.textContent}"`);
      }

      return {
        passed: passedCount === 3,
        message: passedCount === 3 ? 'All test cases passed!' : `${3 - passedCount} test case(s) failed.`,
        details
      };
    }
  },
  {
    id: 3,
    title: 'Password Strength & Match Evaluator',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '5 mins',
    instructions: {
      context: 'Modify the password matching and strength evaluator code.',
      objectives: [
        'Validate that the Password (`#password`) is at least 8 characters long.',
        'Check that Password (`#password`) and Confirm Password (`#confirm-pass`) fields match in real-time.',
        'Set `#feedback-msg` text to "Passwords Match" in green if both pass, or "Passwords do not match or too short" in red if validation fails.'
      ],
      constraints: [
        'Do not rename element IDs.'
      ]
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 350px; margin: auto; }
    input { width: 100%; padding: 8px; margin: 8px 0; box-sizing: border-box; border-radius: 4px; border: 1px solid #ccc; background: #fff; color: #000; }
    #feedback-msg { font-weight: bold; margin-top: 10px; font-size: 0.9rem; }
    .green { color: #16a34a; }
    .red { color: #dc2626; }
  </style>
</head>
<body>
  <h3>Password Evaluator</h3>
  <input type="password" id="password" placeholder="Password (min 8 chars)">
  <input type="password" id="confirm-pass" placeholder="Confirm Password">
  <div id="feedback-msg"></div>

  <script>
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-pass');
    const feedbackMsg = document.getElementById('feedback-msg');

    function evaluatePasswords() {
      const p1 = passInput.value;
      const p2 = confirmInput.value;

      // TODO: Write 5 lines of validation logic
      
    }

    passInput.addEventListener('input', evaluatePasswords);
    confirmInput.addEventListener('input', evaluatePasswords);
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 350px; margin: auto; }
    input { width: 100%; padding: 8px; margin: 8px 0; box-sizing: border-box; border-radius: 4px; border: 1px solid #ccc; background: #fff; color: #000; }
    #feedback-msg { font-weight: bold; margin-top: 10px; font-size: 0.9rem; }
    .green { color: #16a34a; }
    .red { color: #dc2626; }
  </style>
</head>
<body>
  <h3>Password Evaluator</h3>
  <input type="password" id="password" placeholder="Password (min 8 chars)">
  <input type="password" id="confirm-pass" placeholder="Confirm Password">
  <div id="feedback-msg"></div>

  <script>
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-pass');
    const feedbackMsg = document.getElementById('feedback-msg');

    function evaluatePasswords() {
      const p1 = passInput.value;
      const p2 = confirmInput.value;

      if (p1.length >= 8 && p1 === p2) {
        feedbackMsg.textContent = "Passwords Match";
        feedbackMsg.className = "green";
      } else {
        feedbackMsg.textContent = "Passwords do not match or too short";
        feedbackMsg.className = "red";
      }
    }

    passInput.addEventListener('input', evaluatePasswords);
    confirmInput.addEventListener('input', evaluatePasswords);
  </script>
</body>
</html>`,
    missingJsLines: [
      `if (p1.length >= 8 && p1 === p2) {`,
      `  feedbackMsg.textContent = "Passwords Match";`,
      `  feedbackMsg.className = "green";`,
      `} else {`,
      `  feedbackMsg.textContent = "Passwords do not match or too short";`,
      `  feedbackMsg.className = "red";`,
      `}`
    ],
    learningGuide: {
      logicSteps: [
        'Get value of both input fields: `p1 = passInput.value` and `p2 = confirmInput.value`.',
        'Check condition: length >= 8 AND p1 === p2 (`p1.length >= 8 && p1 === p2`).',
        'If true: set `feedbackMsg.textContent = "Passwords Match"` and add class `"green"`.',
        'If false: set `feedbackMsg.textContent = "Passwords do not match or too short"` and add class `"red"`.'
      ],
      jsConcepts: ['Input listener event (`input`)', 'String `.length` property', 'Equality operator `===`', 'Setting CSS classes via `.className`'],
      accentureTip: 'Notice the requirement asks for color green when matched, red when failed! Use class assignment or inline style `feedbackMsg.style.color`.'
    },
    testSuite: (doc) => {
      const pass = doc.getElementById('password') as HTMLInputElement;
      const confirm = doc.getElementById('confirm-pass') as HTMLInputElement;
      const msg = doc.getElementById('feedback-msg');

      if (!pass || !confirm || !msg) {
        return { passed: false, message: 'Elements missing', details: ['Need #password, #confirm-pass, #feedback-msg'] };
      }

      const details: string[] = [];
      let passedCount = 0;

      pass.value = 'abc1234';
      confirm.value = 'abc1234';
      pass.dispatchEvent(new Event('input'));
      if (msg.textContent?.trim() === 'Passwords do not match or too short') {
        details.push('✅ Short password (< 8 chars) rejected: PASSED');
        passedCount++;
      } else {
        details.push(`❌ Short password test failed. Got "${msg.textContent}"`);
      }

      pass.value = 'pass12345';
      confirm.value = 'pass12345';
      confirm.dispatchEvent(new Event('input'));
      if (msg.textContent?.trim() === 'Passwords Match') {
        details.push('✅ Valid matching password accepted: PASSED');
        passedCount++;
      } else {
        details.push(`❌ Valid password test failed. Got "${msg.textContent}"`);
      }

      confirm.value = 'pass12346';
      confirm.dispatchEvent(new Event('input'));
      if (msg.textContent?.trim() === 'Passwords do not match or too short') {
        details.push('✅ Mismatching password rejected: PASSED');
        passedCount++;
      } else {
        details.push(`❌ Mismatch test failed. Got "${msg.textContent}"`);
      }

      return {
        passed: passedCount === 3,
        message: passedCount === 3 ? 'All password validation checks passed!' : `${3 - passedCount} check(s) failed.`,
        details
      };
    }
  },
  {
    id: 4,
    title: 'Show / Hide Password Toggle',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '4 mins',
    instructions: {
      context: 'Implement a show/hide password toggle feature.',
      objectives: [
        'Clicking the `#toggle-btn` toggles the input type of `#password-field` between "password" and "text".',
        'The button\'s label text switches between "Show" and "Hide".',
        'The field should start as type "password" with initial button text "Show".'
      ],
      constraints: [
        'Do not remove #password-field or #toggle-btn.'
      ]
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; text-align: center; }
    .input-group { display: inline-flex; gap: 8px; }
    input { padding: 8px; border-radius: 4px; border: 1px solid #ccc; background: #fff; color: #000; }
    button { padding: 8px 16px; cursor: pointer; border-radius: 4px; border: none; background: #2563eb; color: #fff; }
  </style>
</head>
<body>
  <h3>Login Form</h3>
  <div class="input-group">
    <input type="password" id="password-field" value="SecretPass123">
    <button id="toggle-btn">Show</button>
  </div>

  <script>
    const passField = document.getElementById('password-field');
    const toggleBtn = document.getElementById('toggle-btn');

    toggleBtn.addEventListener('click', () => {
      // TODO: Write 4 lines of JS to toggle input type and button text
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; text-align: center; }
    .input-group { display: inline-flex; gap: 8px; }
    input { padding: 8px; border-radius: 4px; border: 1px solid #ccc; background: #fff; color: #000; }
    button { padding: 8px 16px; cursor: pointer; border-radius: 4px; border: none; background: #2563eb; color: #fff; }
  </style>
</head>
<body>
  <h3>Login Form</h3>
  <div class="input-group">
    <input type="password" id="password-field" value="SecretPass123">
    <button id="toggle-btn">Show</button>
  </div>

  <script>
    const passField = document.getElementById('password-field');
    const toggleBtn = document.getElementById('toggle-btn');

    toggleBtn.addEventListener('click', () => {
      if (passField.type === 'password') {
        passField.type = 'text';
        toggleBtn.textContent = 'Hide';
      } else {
        passField.type = 'password';
        toggleBtn.textContent = 'Show';
      }
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `if (passField.type === 'password') {`,
      `  passField.type = 'text';`,
      `  toggleBtn.textContent = 'Hide';`,
      `} else {`,
      `  passField.type = 'password';`,
      `  toggleBtn.textContent = 'Show';`,
      `}`
    ],
    learningGuide: {
      logicSteps: [
        'Check current `passField.type === "password"`.',
        'If password: change `passField.type = "text"` and update button text to `"Hide"`.',
        'Else: change `passField.type = "password"` and update button text back to `"Show"`.'
      ],
      jsConcepts: ['Input element `.type` property', 'Modifying element property dynamically', 'Button `.textContent` switch'],
      accentureTip: 'Very frequent Accenture question! Always inspect input.type property directly.'
    },
    testSuite: (doc) => {
      const pass = doc.getElementById('password-field') as HTMLInputElement;
      const btn = doc.getElementById('toggle-btn');

      if (!pass || !btn) return { passed: false, message: 'Elements missing', details: ['Need #password-field & #toggle-btn'] };

      const details: string[] = [];
      let passedCount = 0;

      btn.click();
      if (pass.type === 'text' && btn.textContent?.trim() === 'Hide') {
        details.push('✅ First Click (Password -> Text & Label -> Hide): PASSED');
        passedCount++;
      } else {
        details.push(`❌ First click failed. Expected type="text" & text="Hide", got type="${pass.type}" text="${btn.textContent}"`);
      }

      btn.click();
      if (pass.type === 'password' && btn.textContent?.trim() === 'Show') {
        details.push('✅ Second Click (Text -> Password & Label -> Show): PASSED');
        passedCount++;
      } else {
        details.push(`❌ Second click failed. Expected type="password" & text="Show", got type="${pass.type}" text="${btn.textContent}"`);
      }

      return {
        passed: passedCount === 2,
        message: passedCount === 2 ? 'Show/Hide password toggle working perfectly!' : 'Toggle tests failed.',
        details
      };
    }
  },
  {
    id: 5,
    title: 'Checkbox-Enabled Submit Button',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '4 mins',
    instructions: {
      context: 'Design a form submit button enabled by terms checkbox.',
      objectives: [
        'The submit button (`#submit-btn`) remains disabled by default.',
        'When the user checks the "I agree to terms" checkbox (`#terms-check`), enable the submit button.',
        'When unchecked, disable the submit button again.'
      ],
      constraints: ['Keep #terms-check and #submit-btn.']
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 320px; margin: auto; }
    label { display: block; margin: 12px 0; cursor: pointer; }
    button { padding: 10px 20px; width: 100%; border: none; border-radius: 6px; background: #16a34a; color: white; font-weight: bold; cursor: pointer; }
    button:disabled { background: #9ca3af; cursor: not-allowed; opacity: 0.6; }
  </style>
</head>
<body>
  <h3>Terms Agreement</h3>
  <label>
    <input type="checkbox" id="terms-check"> I agree to terms and conditions
  </label>
  <button id="submit-btn" disabled>Submit Form</button>

  <script>
    const checkbox = document.getElementById('terms-check');
    const submitBtn = document.getElementById('submit-btn');

    checkbox.addEventListener('change', () => {
      // TODO: Write 1 line of JS to sync button disabled property with checkbox state
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 320px; margin: auto; }
    label { display: block; margin: 12px 0; cursor: pointer; }
    button { padding: 10px 20px; width: 100%; border: none; border-radius: 6px; background: #16a34a; color: white; font-weight: bold; cursor: pointer; }
    button:disabled { background: #9ca3af; cursor: not-allowed; opacity: 0.6; }
  </style>
</head>
<body>
  <h3>Terms Agreement</h3>
  <label>
    <input type="checkbox" id="terms-check"> I agree to terms and conditions
  </label>
  <button id="submit-btn" disabled>Submit Form</button>

  <script>
    const checkbox = document.getElementById('terms-check');
    const submitBtn = document.getElementById('submit-btn');

    checkbox.addEventListener('change', () => {
      submitBtn.disabled = !checkbox.checked;
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `submitBtn.disabled = !checkbox.checked;`
    ],
    learningGuide: {
      logicSteps: [
        'Listen to `change` event on `#terms-check`.',
        'Set `submitBtn.disabled = !checkbox.checked`.'
      ],
      jsConcepts: ['Checkbox `.checked` property', 'Button `.disabled` property'],
      accentureTip: 'Cleanest 1-line answer in JS: `submitBtn.disabled = !checkbox.checked`.'
    },
    testSuite: (doc) => {
      const checkbox = doc.getElementById('terms-check') as HTMLInputElement;
      const btn = doc.getElementById('submit-btn') as HTMLButtonElement;

      if (!checkbox || !btn) return { passed: false, message: 'Elements missing', details: ['Need #terms-check and #submit-btn'] };

      const details: string[] = [];
      let passedCount = 0;

      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      if (btn.disabled === false) {
        details.push('✅ Enabling button when checked: PASSED');
        passedCount++;
      } else {
        details.push('❌ Button was not enabled when checkbox checked.');
      }

      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
      if (btn.disabled === true) {
        details.push('✅ Disabling button when unchecked: PASSED');
        passedCount++;
      } else {
        details.push('❌ Button was not disabled when checkbox unchecked.');
      }

      return {
        passed: passedCount === 2,
        message: passedCount === 2 ? 'Checkbox enabled submit button test passed!' : 'Test failed.',
        details
      };
    }
  },
  {
    id: 6,
    title: 'Dynamic Background Color Changer',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '4 mins',
    instructions: {
      context: 'Use a dropdown menu to change the entire webpage background color.',
      objectives: [
        'Selecting an option from dropdown `#bg-select` changes `document.body` background color dynamically.',
        'Update `#color-display` paragraph to show "Current Color: [color_value]"'
      ],
      constraints: ['Keep #bg-select and #color-display.']
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 30px; text-align: center; color: #18181b; background: #ffffff; transition: background 0.3s; }
    select { padding: 10px; font-size: 1rem; border-radius: 6px; border: 1px solid #ccc; background: #fff; color: #000; }
  </style>
</head>
<body>
  <h2>Background Color Selector</h2>
  <select id="bg-select">
    <option value="#ffffff">Default White</option>
    <option value="#f87171">Light Red</option>
    <option value="#4ade80">Light Green</option>
    <option value="#60a5fa">Light Blue</option>
  </select>
  <p id="color-display">Current Color: #ffffff</p>

  <script>
    const selectEl = document.getElementById('bg-select');
    const colorDisplay = document.getElementById('color-display');

    selectEl.addEventListener('change', () => {
      // TODO: Write 3 lines of JS code
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 30px; text-align: center; color: #18181b; background: #ffffff; transition: background 0.3s; }
    select { padding: 10px; font-size: 1rem; border-radius: 6px; border: 1px solid #ccc; background: #fff; color: #000; }
  </style>
</head>
<body>
  <h2>Background Color Selector</h2>
  <select id="bg-select">
    <option value="#ffffff">Default White</option>
    <option value="#f87171">Light Red</option>
    <option value="#4ade80">Light Green</option>
    <option value="#60a5fa">Light Blue</option>
  </select>
  <p id="color-display">Current Color: #ffffff</p>

  <script>
    const selectEl = document.getElementById('bg-select');
    const colorDisplay = document.getElementById('color-display');

    selectEl.addEventListener('change', () => {
      const selectedColor = selectEl.value;
      document.body.style.backgroundColor = selectedColor;
      colorDisplay.textContent = "Current Color: " + selectedColor;
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `const selectedColor = selectEl.value;`,
      `document.body.style.backgroundColor = selectedColor;`,
      `colorDisplay.textContent = "Current Color: " + selectedColor;`
    ],
    learningGuide: {
      logicSteps: [
        'Get dropdown value: `selectEl.value`.',
        'Update body style: `document.body.style.backgroundColor = selectedColor`.',
        'Update text: `colorDisplay.textContent = "Current Color: " + selectedColor`.'
      ],
      jsConcepts: ['Dropdown `.value`', 'Inline styles `style.backgroundColor`'],
      accentureTip: 'Remember camelCase in JS DOM styling: `backgroundColor` instead of `background-color`.'
    },
    testSuite: (doc) => {
      const select = doc.getElementById('bg-select') as HTMLSelectElement;
      const display = doc.getElementById('color-display');

      if (!select || !display) return { passed: false, message: 'Elements missing', details: ['Need #bg-select and #color-display'] };

      select.value = '#f87171';
      select.dispatchEvent(new Event('change'));

      if (display.textContent?.includes('#f87171')) {
        return {
          passed: true,
          message: 'Dynamic background color change passed!',
          details: ['✅ Changed body background color to #f87171', '✅ Updated #color-display text']
        };
      }

      return {
        passed: false,
        message: 'Failed background color update.',
        details: [`Display text: "${display.textContent}"`]
      };
    }
  },
  {
    id: 7,
    title: 'Numeric Input Restriction',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '4 mins',
    instructions: {
      context: 'Build an input field that warns if non-numeric characters are entered.',
      objectives: [
        'When user types inside `#num-input`, check if non-numeric characters (anything other than digits 0-9) are entered.',
        'If a non-numeric character is detected, update `#warning-msg` text to "Only numbers allowed!" in red.',
        'If only numeric digits or empty, keep `#warning-msg` text empty.'
      ],
      constraints: ['Keep #num-input and #warning-msg.']
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 320px; margin: auto; }
    input { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; background: #fff; color: #000; box-sizing: border-box; }
    #warning-msg { color: #dc2626; font-size: 0.85rem; margin-top: 8px; height: 18px; font-weight: bold; }
  </style>
</head>
<body>
  <h3>Phone / Age Input</h3>
  <input type="text" id="num-input" placeholder="Type numbers only...">
  <div id="warning-msg"></div>

  <script>
    const inputField = document.getElementById('num-input');
    const warningMsg = document.getElementById('warning-msg');

    inputField.addEventListener('input', () => {
      const val = inputField.value;
      // TODO: Write 4 lines of regex/validation check
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 320px; margin: auto; }
    input { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; background: #fff; color: #000; box-sizing: border-box; }
    #warning-msg { color: #dc2626; font-size: 0.85rem; margin-top: 8px; height: 18px; font-weight: bold; }
  </style>
</head>
<body>
  <h3>Phone / Age Input</h3>
  <input type="text" id="num-input" placeholder="Type numbers only...">
  <div id="warning-msg"></div>

  <script>
    const inputField = document.getElementById('num-input');
    const warningMsg = document.getElementById('warning-msg');

    inputField.addEventListener('input', () => {
      const val = inputField.value;
      if (/^\\d*$/.test(val)) {
        warningMsg.textContent = "";
      } else {
        warningMsg.textContent = "Only numbers allowed!";
      }
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `if (/^\\d*$/.test(val)) {`,
      `  warningMsg.textContent = "";`,
      `} else {`,
      `  warningMsg.textContent = "Only numbers allowed!";`,
      `}`
    ],
    learningGuide: {
      logicSteps: [
        'Use regex `/^\\d*$/` to check if string contains only digits.',
        'If regex passes: `warningMsg.textContent = ""`.',
        'Else: `warningMsg.textContent = "Only numbers allowed!"`.'
      ],
      jsConcepts: ['Regex `/^\d*$/`', '`regex.test(val)`'],
      accentureTip: 'Use `/^\d*$/` to check digits only.'
    },
    testSuite: (doc) => {
      const input = doc.getElementById('num-input') as HTMLInputElement;
      const msg = doc.getElementById('warning-msg');

      if (!input || !msg) return { passed: false, message: 'Elements missing', details: ['Need #num-input and #warning-msg'] };

      input.value = '12345';
      input.dispatchEvent(new Event('input'));
      const pass1 = msg.textContent === '';

      input.value = '123a5';
      input.dispatchEvent(new Event('input'));
      const pass2 = msg.textContent === 'Only numbers allowed!';

      if (pass1 && pass2) {
        return {
          passed: true,
          message: 'Numeric input restriction passed!',
          details: ['✅ Valid digits accepted silently', '✅ Non-numeric character triggered "Only numbers allowed!" warning']
        };
      }

      return {
        passed: false,
        message: 'Numeric restriction test failed.',
        details: [`Got warning text: "${msg.textContent}"`]
      };
    }
  },
  {
    id: 8,
    title: 'Accordion Expand / Collapse Panel',
    category: 'Front end Technology',
    difficulty: 'Easy',
    timeEstimate: '5 mins',
    instructions: {
      context: 'Implement an interactive accordion toggle.',
      objectives: [
        'Clicking button `#accordion-btn` toggles display of content div `#accordion-content`.',
        'When content is hidden (`display: none`), change button text to "Show Details".',
        'When content is visible, change button text to "Hide Details".'
      ],
      constraints: ['Keep #accordion-btn and #accordion-content.']
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 350px; margin: auto; }
    button { padding: 8px 16px; border-radius: 4px; border: none; background: #0284c7; color: #fff; font-weight: bold; cursor: pointer; width: 100%; }
    #accordion-content { display: none; padding: 12px; border: 1px solid #ccc; margin-top: 8px; border-radius: 4px; background: #f8fafc; }
  </style>
</head>
<body>
  <h3>Accenture Accordion</h3>
  <button id="accordion-btn">Show Details</button>
  <div id="accordion-content">
    <p>Accenture provides IT services, consulting, and digital solutions globally.</p>
  </div>

  <script>
    const accBtn = document.getElementById('accordion-btn');
    const accContent = document.getElementById('accordion-content');

    accBtn.addEventListener('click', () => {
      // TODO: Write 5 lines to toggle display and button text
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 350px; margin: auto; }
    button { padding: 8px 16px; border-radius: 4px; border: none; background: #0284c7; color: #fff; font-weight: bold; cursor: pointer; width: 100%; }
    #accordion-content { display: none; padding: 12px; border: 1px solid #ccc; margin-top: 8px; border-radius: 4px; background: #f8fafc; }
  </style>
</head>
<body>
  <h3>Accenture Accordion</h3>
  <button id="accordion-btn">Show Details</button>
  <div id="accordion-content">
    <p>Accenture provides IT services, consulting, and digital solutions globally.</p>
  </div>

  <script>
    const accBtn = document.getElementById('accordion-btn');
    const accContent = document.getElementById('accordion-content');

    accBtn.addEventListener('click', () => {
      if (accContent.style.display === 'block') {
        accContent.style.display = 'none';
        accBtn.textContent = 'Show Details';
      } else {
        accContent.style.display = 'block';
        accBtn.textContent = 'Hide Details';
      }
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `if (accContent.style.display === 'block') {`,
      `  accContent.style.display = 'none';`,
      `  accBtn.textContent = 'Show Details';`,
      `} else {`,
      `  accContent.style.display = 'block';`,
      `  accBtn.textContent = 'Hide Details';`,
      `}`
    ],
    learningGuide: {
      logicSteps: [
        'Check `accContent.style.display === "block"`.',
        'If open: set `style.display = "none"` and text `"Show Details"`.',
        'Else: set `style.display = "block"` and text `"Hide Details"`.'
      ],
      jsConcepts: ['DOM display property toggling', 'Element `.textContent` change'],
      accentureTip: 'Classic UI component question in Accenture interviews.'
    },
    testSuite: (doc) => {
      const btn = doc.getElementById('accordion-btn');
      const content = doc.getElementById('accordion-content');

      if (!btn || !content) return { passed: false, message: 'Elements missing', details: ['Need #accordion-btn and #accordion-content'] };

      btn.click();
      const openPassed = content.style.display === 'block' && btn.textContent?.trim() === 'Hide Details';

      btn.click();
      const closePassed = content.style.display === 'none' && btn.textContent?.trim() === 'Show Details';

      if (openPassed && closePassed) {
        return {
          passed: true,
          message: 'Accordion expand/collapse toggle passed!',
          details: ['✅ Expanded panel & updated button to "Hide Details"', '✅ Collapsed panel & updated button to "Show Details"']
        };
      }

      return {
        passed: false,
        message: 'Accordion toggle test failed.',
        details: [`Display: ${content.style.display}, Text: "${btn.textContent}"`]
      };
    }
  },
  {
    id: 9,
    title: 'Auto-Tab / Auto-Focus Next Input Field',
    category: 'Front end Technology',
    difficulty: 'Medium',
    timeEstimate: '5 mins',
    instructions: {
      context: 'Implement auto-focusing for a multi-digit OTP security input code.',
      objectives: [
        'When user types 1 character in input `#otp-1`, automatically focus input `#otp-2`.',
        'When user types 1 character in input `#otp-2`, automatically focus input `#otp-3`.',
        'When user types 1 character in input `#otp-3`, automatically focus input `#otp-4`.'
      ],
      constraints: ['Keep #otp-1, #otp-2, #otp-3, #otp-4 IDs intact.']
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; text-align: center; }
    .otp-container { display: flex; justify-content: center; gap: 8px; margin-top: 15px; }
    input { width: 40px; height: 45px; text-align: center; font-size: 1.2rem; font-weight: bold; border-radius: 6px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <h3>Enter 4-Digit Security Code</h3>
  <div class="otp-container">
    <input type="text" id="otp-1" maxlength="1">
    <input type="text" id="otp-2" maxlength="1">
    <input type="text" id="otp-3" maxlength="1">
    <input type="text" id="otp-4" maxlength="1">
  </div>

  <script>
    const inputs = [
      document.getElementById('otp-1'),
      document.getElementById('otp-2'),
      document.getElementById('otp-3'),
      document.getElementById('otp-4')
    ];

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        // TODO: Write 3 lines to focus next input when length is 1
        
      });
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; text-align: center; }
    .otp-container { display: flex; justify-content: center; gap: 8px; margin-top: 15px; }
    input { width: 40px; height: 45px; text-align: center; font-size: 1.2rem; font-weight: bold; border-radius: 6px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <h3>Enter 4-Digit Security Code</h3>
  <div class="otp-container">
    <input type="text" id="otp-1" maxlength="1">
    <input type="text" id="otp-2" maxlength="1">
    <input type="text" id="otp-3" maxlength="1">
    <input type="text" id="otp-4" maxlength="1">
  </div>

  <script>
    const inputs = [
      document.getElementById('otp-1'),
      document.getElementById('otp-2'),
      document.getElementById('otp-3'),
      document.getElementById('otp-4')
    ];

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `if (input.value.length === 1 && index < inputs.length - 1) {`,
      `  inputs[index + 1].focus();`,
      `}`
    ],
    learningGuide: {
      logicSteps: [
        'Check `input.value.length === 1`.',
        'Check boundary `index < inputs.length - 1`.',
        'Call `inputs[index + 1].focus()` to auto-advance focus.'
      ],
      jsConcepts: ['`element.focus()` method', 'Array `forEach` with `index` parameter'],
      accentureTip: 'OTP auto-focusing is a staple pattern in modern web dev rounds.'
    },
    testSuite: (doc) => {
      const i1 = doc.getElementById('otp-1') as HTMLInputElement;
      const i2 = doc.getElementById('otp-2') as HTMLInputElement;

      if (!i1 || !i2) return { passed: false, message: 'Elements missing', details: ['Need #otp-1 and #otp-2'] };

      i1.value = '5';
      i1.dispatchEvent(new Event('input'));

      return {
        passed: true,
        message: 'Auto-focus logic verified!',
        details: ['✅ Attached auto-tab handler on inputs']
      };
    }
  },
  {
    id: 10,
    title: 'Shopping Cart Total Price Calculator',
    category: 'Front end Technology',
    difficulty: 'Medium',
    timeEstimate: '6 mins',
    instructions: {
      context: 'Calculate the dynamic total price in a shopping cart based on item quantity input.',
      objectives: [
        'Each item has price $10. As user changes input `#item-qty`, compute total = qty * 10.',
        'Update `#total-val` text to display formatted price like "$30".',
        'If qty is negative or empty, treat qty as 0.'
      ],
      constraints: ['Keep #item-qty and #total-val.']
    },
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 320px; margin: auto; }
    .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    input { width: 50px; padding: 6px; text-align: center; border-radius: 4px; border: 1px solid #ccc; }
    #total-val { font-weight: bold; color: #16a34a; font-size: 1.2rem; }
  </style>
</head>
<body>
  <h3>Shopping Cart</h3>
  <div class="cart-item">
    <span>Wireless Mouse ($10)</span>
    <input type="number" id="item-qty" value="1" min="0">
  </div>
  <h4>Total: <span id="total-val">$10</span></h4>

  <script>
    const qtyInput = document.getElementById('item-qty');
    const totalVal = document.getElementById('total-val');
    const pricePerUnit = 10;

    qtyInput.addEventListener('input', () => {
      // TODO: Write 4 lines to calculate sum and update DOM
      
    });
  </script>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #ffffff; color: #18181b; max-width: 320px; margin: auto; }
    .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    input { width: 50px; padding: 6px; text-align: center; border-radius: 4px; border: 1px solid #ccc; }
    #total-val { font-weight: bold; color: #16a34a; font-size: 1.2rem; }
  </style>
</head>
<body>
  <h3>Shopping Cart</h3>
  <div class="cart-item">
    <span>Wireless Mouse ($10)</span>
    <input type="number" id="item-qty" value="1" min="0">
  </div>
  <h4>Total: <span id="total-val">$10</span></h4>

  <script>
    const qtyInput = document.getElementById('item-qty');
    const totalVal = document.getElementById('total-val');
    const pricePerUnit = 10;

    qtyInput.addEventListener('input', () => {
      const qty = parseInt(qtyInput.value) || 0;
      const total = Math.max(0, qty) * pricePerUnit;
      totalVal.textContent = "$" + total;
    });
  </script>
</body>
</html>`,
    missingJsLines: [
      `const qty = parseInt(qtyInput.value) || 0;`,
      `const total = Math.max(0, qty) * pricePerUnit;`,
      `totalVal.textContent = "$" + total;`
    ],
    learningGuide: {
      logicSteps: [
        'Parse integer: `const qty = parseInt(qtyInput.value) || 0`.',
        'Calculate total: `Math.max(0, qty) * pricePerUnit`.',
        'Update text: `totalVal.textContent = "$" + total`.'
      ],
      jsConcepts: ['`parseInt()` with fallback `|| 0`', '`Math.max()` for non-negative values'],
      accentureTip: 'Always handle empty/invalid input using `parseInt(val) || 0`.'
    },
    testSuite: (doc) => {
      const input = doc.getElementById('item-qty') as HTMLInputElement;
      const total = doc.getElementById('total-val');

      if (!input || !total) return { passed: false, message: 'Elements missing', details: ['Need #item-qty and #total-val'] };

      input.value = '4';
      input.dispatchEvent(new Event('input'));

      if (total.textContent?.trim() === '$40') {
        return {
          passed: true,
          message: 'Total calculation passed!',
          details: ['✅ Correctly computed 4 * $10 = $40']
        };
      }

      return {
        passed: false,
        message: 'Calculation failed.',
        details: [`Expected "$40", got "${total.textContent}"`]
      };
    }
  }
];
