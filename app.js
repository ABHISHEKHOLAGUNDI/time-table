/* ============================================
   THE GRIND TRACKER — app.js
   All interactive logic for the PWA
   ============================================ */

// ============================================
// 1. WORKOUT DATA (A/B Push-Pull-Legs Split)
// ============================================
const WORKOUT_PLAN = {
  // dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  0: {
    dayName: 'Sunday',
    workoutType: 'Rest & Recover',
    focus: 'Growth Phase',
    isRestDay: true,
    exercises: []
  },
  1: {
    dayName: 'Monday',
    workoutType: 'Push A',
    focus: 'Overall Chest Mass & Triceps',
    isRestDay: false,
    exercises: [
      { name: 'Flat Barbell Bench Press', target: 'Overall Chest Thickness', sets: 4, reps: '6-8', img: 'bench_press.png' },
      { name: 'Incline Dumbbell Press', target: 'Upper Chest', sets: 3, reps: '8-10', img: 'incline_db.png' },
      { name: 'Cable Crossovers (High to Low)', target: 'Lower/Outer Chest', sets: 3, reps: '10-12', img: 'cable_cross.png' },
      { name: 'Dumbbell Lateral Raises', target: 'Side Delts', sets: 4, reps: '12-15', img: 'lat_raise.png' },
      { name: 'EZ Bar Skull Crushers', target: 'Overall Tricep Mass', sets: 3, reps: '8-10', img: 'skull_crusher.png' },
      { name: 'Tricep Rope Pushdowns', target: 'Tricep Lateral Head', sets: 3, reps: '10-12', img: 'rope_pushdown.png' }
    ]
  },
  2: {
    dayName: 'Tuesday',
    workoutType: 'Pull A',
    focus: 'Back Width & Bicep Peak',
    isRestDay: false,
    exercises: [
      { name: 'Pull-ups or Wide Lat Pulldown', target: 'Lats (V-Taper)', sets: 4, reps: '6-8', img: 'pullups.png' },
      { name: 'Chest-Supported T-Bar Row', target: 'Mid-Back Thickness', sets: 3, reps: '8-10', img: 'tbar_row.png' },
      { name: 'Neutral Grip Cable Row', target: 'Lower Lats', sets: 3, reps: '10-12', img: 'cable_row.png' },
      { name: 'Face Pulls', target: 'Rear Delts', sets: 3, reps: '12-15', img: 'face_pulls.png' },
      { name: 'Barbell Bicep Curls', target: 'Overall Bicep Mass', sets: 3, reps: '8-10', img: 'bb_curl.png' },
      { name: 'Dumbbell Hammer Curls', target: 'Brachialis (Arm Width)', sets: 3, reps: '10-12', img: 'hammer_curl.png' }
    ]
  },
  3: {
    dayName: 'Wednesday',
    workoutType: 'Legs A',
    focus: 'Quad Sweep & Calves',
    isRestDay: false,
    exercises: [
      { name: 'Barbell Back Squats', target: 'Overall Leg Mass', sets: 4, reps: '6-8', img: 'squats.png' },
      { name: 'Leg Press (Feet Close)', target: 'Outer Quad Sweep', sets: 3, reps: '10-12', img: 'leg_press.png' },
      { name: 'Leg Extensions', target: 'Quad Teardrop', sets: 3, reps: '12-15', img: 'leg_ext.png' },
      { name: 'Romanian Deadlifts (RDLs)', target: 'Hamstring Mass', sets: 3, reps: '8-10', img: 'rdl.png' },
      { name: 'Standing Calf Raises', target: 'Overall Calf Mass', sets: 4, reps: '12-15', img: 'calf_raise.png' }
    ]
  },
  4: {
    dayName: 'Thursday',
    workoutType: 'Push B',
    focus: '3D Shoulders & Upper Chest',
    isRestDay: false,
    exercises: [
      { name: 'Seated DB Shoulder Press', target: 'Front Delts & Mass', sets: 4, reps: '6-8', img: 'db_shoulder_press.png' },
      { name: 'Incline Barbell Bench Press', target: 'Upper Chest Mass', sets: 3, reps: '8-10', img: 'incline_bb.png' },
      { name: 'Pec Deck Machine or DB Flyes', target: 'Inner Chest Detail', sets: 3, reps: '10-12', img: 'pec_deck.png' },
      { name: 'Cable Lateral Raises', target: 'Side Delts (Constant Tension)', sets: 4, reps: '12-15', img: 'cable_lat_raise.png' },
      { name: 'Overhead Cable Extension', target: 'Tricep Long Head', sets: 3, reps: '10-12', img: 'overhead_tri.png' },
      { name: 'Close-Grip Bench Press', target: 'Triceps & Inner Chest', sets: 3, reps: '8-10', img: 'close_grip_bench.png' }
    ]
  },
  5: {
    dayName: 'Friday',
    workoutType: 'Pull B',
    focus: 'Back Thickness & Arm Length',
    isRestDay: false,
    exercises: [
      { name: 'Barbell Bent-Over Row', target: 'Overall Back Density', sets: 4, reps: '6-8', img: 'bb_row.png' },
      { name: 'Single-Arm Dumbbell Row', target: 'Lat Thickness', sets: 3, reps: '8-10', img: 'single_arm_row.png' },
      { name: 'V-Grip Lat Pulldown', target: 'Mid-Back & Lats', sets: 3, reps: '10-12', img: 'vgrip_pulldown.png' },
      { name: 'Reverse Pec Deck Machine', target: 'Rear Delts', sets: 3, reps: '12-15', img: 'reverse_pec.png' },
      { name: 'Incline Dumbbell Curls', target: 'Bicep Long Head', sets: 3, reps: '10-12', img: 'incline_curl.png' },
      { name: 'EZ Bar Preacher Curls', target: 'Bicep Peak Isolation', sets: 3, reps: '10-12', img: 'preacher_curl.png' }
    ]
  },
  6: {
    dayName: 'Saturday',
    workoutType: 'Legs B',
    focus: 'Hamstrings, Glutes & Abs',
    isRestDay: false,
    exercises: [
      { name: 'Heavy Deadlift or Heavy RDL', target: 'Posterior Chain', sets: 4, reps: '5-8', img: 'deadlift.png' },
      { name: 'Hack Squats or Bulgarian Split Squats', target: 'Quad Isolation', sets: 3, reps: '8-10', img: 'hack_squat.png' },
      { name: 'Lying Leg Curls', target: 'Hamstring Isolation', sets: 3, reps: '10-12', img: 'leg_curl.png' },
      { name: 'Seated Calf Raises', target: 'Soleus (Lower Calf)', sets: 4, reps: '15-20', img: 'seated_calf.png' },
      { name: 'Hanging Leg Raises', target: 'Lower Abs', sets: 3, reps: '12-15', img: 'hanging_leg_raise.png' },
      { name: 'Weighted Cable Crunches', target: 'Blocky 3D Abs', sets: 3, reps: '10-12', img: 'cable_crunch.png' }
    ]
  }
};

// Emoji map for exercises (used as placeholder when images aren't available)
const EXERCISE_EMOJIS = {
  'Push A': '🏋️',
  'Push B': '🏋️',
  'Pull A': '🧗',
  'Pull B': '🧗',
  'Legs A': '🦵',
  'Legs B': '🦵'
};

const WORKOUT_COVER_IMAGES = {
  'Push A': 'img/push_workout_icon_1772648606208.png',
  'Push B': 'img/push_workout_icon_1772648606208.png',
  'Pull A': 'img/pull_workout_icon_1772648626163.png',
  'Pull B': 'img/pull_workout_icon_1772648626163.png',
  'Legs A': 'img/legs_workout_icon_1772648648226.png',
  'Legs B': 'img/legs_workout_icon_1772648648226.png'
};

// Automatically render today's workout into the timetable
function renderTodaysWorkout() {
  const gymExpandContent = document.getElementById('gymExpandContent');
  if (!gymExpandContent) return;

  const todayIdx = new Date().getDay();
  const plan = WORKOUT_PLAN[todayIdx];

  if (plan.isRestDay) {
    gymExpandContent.innerHTML = `<div style="padding:16px; text-align:center;">
      <h3>💤 Rest Day</h3>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">Recover well. Growth happens outside the gym.</p>
    </div>`;
    return;
  }

  const coverImg = WORKOUT_COVER_IMAGES[plan.workoutType];
  const listHtml = plan.exercises.map((ex, i) => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); margin-bottom:6px; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.02);">
      <div>
        <div style="font-weight:600; font-size:0.9rem;">${i + 1}. ${ex.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${ex.target}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-weight:700; color:var(--accent-lime);">${ex.sets} Sets</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${ex.reps} reps</div>
      </div>
    </div>
  `).join('');

  gymExpandContent.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="position:relative; width:100%; height:140px; border-radius:12px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.5);">
         <img src="${coverImg}" style="width:100%; height:100%; object-fit:cover;" alt="${plan.workoutType}">
         <div style="position:absolute; bottom:0; padding:16px; background:linear-gradient(transparent, rgba(15,15,20,0.9)); width:100%;">
            <h3 style="margin:0; font-size:1.2rem; display:flex; gap:8px; align-items:center;">
              ${EXERCISE_EMOJIS[plan.workoutType]} ${plan.workoutType}
            </h3>
            <span style="font-size:0.8rem; color:#d1d1eb;">Focus: ${plan.focus}</span>
         </div>
      </div>
      <div>
        ${listHtml}
      </div>
    </div>
  `;
}

renderTodaysWorkout();

// ============================================
// 2. TAB SWITCHING
// ============================================
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs & contents
    navTabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    // Activate clicked tab
    tab.classList.add('active');
    const targetId = 'tab-' + tab.dataset.tab;
    const targetContent = document.getElementById(targetId);
    if (targetContent) targetContent.classList.add('active');
  });
});


// ============================================
// 3. ACCORDION TOGGLE (Expandable Blocks)
// ============================================
document.querySelectorAll('.time-block.expandable').forEach(block => {
  const header = block.querySelector('.block-header');
  if (!header) return;

  header.addEventListener('click', (e) => {
    // Don't toggle if user clicked the check button
    if (e.target.closest('.block-check')) return;
    // Toggle open/close
    block.classList.toggle('open');
  });
});


// ============================================
// 4. CHECKBOX TOGGLE (Mark block complete + save to DB)
// ============================================
document.querySelectorAll('.block-check').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Don't trigger accordion
    btn.classList.toggle('checked');
    updateTasksDoneCount();

    // Persist to supabaseClient tasks table
    const block = btn.closest('.time-block');
    if (block && supabaseClient) {
      const blockId = block.dataset.blockId;
      const label = block.querySelector('.block-label')?.textContent || '';
      const completed = btn.classList.contains('checked');
      saveTaskCompletion(blockId, label, completed);
    }
  });
});

/** Count how many blocks are checked and update the stats bar */
function updateTasksDoneCount() {
  const total = document.querySelectorAll('.block-check').length;
  const done = document.querySelectorAll('.block-check.checked').length;
  const el = document.getElementById('tasksDone');
  if (el) el.textContent = `${done}/${total}`;

  // Update streak after count change
  if (supabaseClient) updateStreak(done, total);
}

/** Save a single block's completion status to supabaseClient */
async function saveTaskCompletion(blockId, label, completed) {
  if (!supabaseClient || !blockId) return;
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const { error } = await supabaseClientClient
    .from('tasks')
    .upsert(
      { task_date: today, block_id: blockId, block_label: label, completed: completed },
      { onConflict: 'task_date,block_id' }
    );

  if (error) {
    console.error('Save task error:', error);
  }
}

/** Load today's saved tasks from supabaseClient and restore checkboxes */
async function loadSavedTasks() {
  if (!supabaseClient) return;
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabaseClientClient
    .from('tasks')
    .select('block_id, completed')
    .eq('task_date', today);

  if (error) {
    console.error('Load tasks error:', error);
    return;
  }

  if (data && data.length > 0) {
    data.forEach(task => {
      const block = document.querySelector(`[data-block-id="${task.block_id}"]`);
      if (block && task.completed) {
        const btn = block.querySelector('.block-check');
        if (btn) btn.classList.add('checked');
      }
    });
    updateTasksDoneCount();
  }
}

/** Update today's streak record in supabaseClient */
async function updateStreak(done, total) {
  if (!supabaseClient) return;
  const today = new Date().toISOString().split('T')[0];
  const isPerfect = done === total && total > 0;

  // Calculate consecutive streak count
  let streakCount = 0;
  if (done > 0) {
    // Fetch recent streak records to calculate consecutive days
    const { data } = await supabaseClientClient
      .from('streaks')
      .select('streak_date, is_perfect_day')
      .order('streak_date', { ascending: false })
      .limit(30);

    if (data) {
      // Count consecutive days with tasks completed (before today)
      const yesterday = new Date();
      for (let i = 0; i < data.length; i++) {
        yesterday.setDate(yesterday.getDate() - 1);
        const expectedDate = yesterday.toISOString().split('T')[0];
        const record = data.find(d => d.streak_date === expectedDate);
        if (record) {
          streakCount++;
        } else {
          break;
        }
      }
    }
    streakCount++; // Include today
  }

  // Upsert today's streak
  await supabaseClientClient
    .from('streaks')
    .upsert(
      {
        streak_date: today,
        tasks_completed: done,
        tasks_total: total,
        is_perfect_day: isPerfect,
        streak_count: streakCount
      },
      { onConflict: 'streak_date' }
    );

  // Update UI
  const streakEl = document.getElementById('streakCount');
  if (streakEl) streakEl.textContent = streakCount;
}


// ============================================
// 5. CURRENT TIME DISPLAY (Updates every second)
// ============================================
function updateCurrentTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const timeStr = `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
  const el = document.getElementById('currentTime');
  if (el) el.textContent = timeStr;
}

// Run once immediately, then every second
updateCurrentTime();
setInterval(updateCurrentTime, 1000);


// ============================================
// 6. TIME-BLOCK HIGHLIGHTING (Active block)
// ============================================

/**
 * Parses "HH:MM" into total minutes since midnight.
 * @param {string} timeStr - e.g. "09:30"
 * @returns {number} minutes since midnight
 */
function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Highlights the current active time block and dims past blocks.
 * Runs every minute.
 */
function highlightCurrentBlock() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const blocks = document.querySelectorAll('.time-block');

  blocks.forEach(block => {
    const startStr = block.dataset.start;
    const endStr = block.dataset.end;
    if (!startStr || !endStr) return;

    const start = parseTime(startStr);
    let end = parseTime(endStr);

    // Handle wrap-around (e.g. Sleep: 23:00 → 07:30)
    if (end <= start) {
      // If current time is after start OR before end, it's active
      if (currentMinutes >= start || currentMinutes < end) {
        block.classList.add('active');
        block.classList.remove('completed');
      } else if (currentMinutes >= end && currentMinutes < start) {
        block.classList.remove('active');
        // Only mark completed if block has passed
        block.classList.add('completed');
      }
    } else {
      // Normal case
      if (currentMinutes >= start && currentMinutes < end) {
        block.classList.add('active');
        block.classList.remove('completed');
      } else {
        block.classList.remove('active');
        if (currentMinutes >= end) {
          block.classList.add('completed');
        }
      }
    }
  });
}

// Run once immediately, then every 30 seconds
highlightCurrentBlock();
setInterval(highlightCurrentBlock, 30000);


// ============================================
// 7. WORKOUT ROUTING (Auto by Day)
// ============================================

/**
 * Uses Date.getDay() to determine today's workout and
 * inject the exercise list into the GYM block's expand area.
 */
function renderTodaysWorkout() {
  const today = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const workout = WORKOUT_PLAN[today];
  const container = document.getElementById('gymExpandContent');
  if (!container) return;

  // Also update the GYM block subtitle with today's workout type
  const gymBlock = document.querySelector('[data-block-id="gym"]');
  if (gymBlock) {
    const detail = gymBlock.querySelector('.block-detail');
    if (detail) {
      detail.textContent = workout.isRestDay
        ? 'Rest Day — no gym today 😴'
        : `${workout.workoutType} — ${workout.focus}`;
    }
  }

  // Sunday = Rest Day
  if (workout.isRestDay) {
    container.innerHTML = `
      <div class="rest-day-message">
        <div class="rest-icon">🧘</div>
        <h3>Rest & Recover</h3>
        <p>Growth happens during rest. Stretch, hydrate, eat well, and get 8+ hrs of sleep tonight.</p>
      </div>
    `;
    return;
  }

  // Build exercise list HTML
  const emoji = EXERCISE_EMOJIS[workout.workoutType] || '💪';
  let html = `
    <div style="margin-bottom:10px;">
      <span style="
        background: linear-gradient(135deg, var(--accent-lime), var(--accent-cyan));
        color: var(--bg-primary);
        font-weight:800; font-size:0.78rem;
        padding:4px 12px; border-radius:20px;
        text-transform:uppercase; letter-spacing:1px;
      ">${workout.dayName} — ${workout.workoutType}</span>
      <span style="font-size:0.82rem; color:var(--text-secondary); margin-left:8px;">${workout.focus}</span>
    </div>
    <div class="expand-exercise-list">
  `;

  workout.exercises.forEach(ex => {
    html += `
      <div class="expand-exercise-item">
        <div class="exercise-img-mini">
          <img src="images/${ex.img}" alt="${ex.name}" onerror="this.style.display='none'; this.parentElement.textContent='${emoji}';" />
        </div>
        <div class="exercise-info">
          <div class="exercise-name">${ex.name}</div>
          <div class="exercise-target">${ex.target}</div>
          <div class="exercise-sets">${ex.sets} sets × ${ex.reps} reps</div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  html += `<p style="font-size:0.78rem; color:var(--text-muted); margin-top:10px;">💧 Drink plenty of water between sets.</p>`;
  container.innerHTML = html;
}

// Render on load
renderTodaysWorkout();


// ============================================
// 8. supabaseClient CLIENT (Auto-connect with credentials)
// ============================================
let supabaseClient = null;

// ★ Hardcoded credentials — auto-connect on load
const SUPABASE_URL = 'https://lvwjfjvybpvbulpgkdbm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2d2pmanZ5YnB2YnVscGdrZGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzY3OTYsImV4cCI6MjA4ODIxMjc5Nn0._GkU2_ePiU_6yldbfcJifSHFmqgG3QjlTulfMRYNLts';

/** Initialize the supabaseClient client */
function initSupabase(url, key) {
  try {
    supabaseClient = window.supabase.createClient(url, key);
    // Update Settings UI to show connected
    const urlInput = document.getElementById('supabaseUrl');
    const keyInput = document.getElementById('supabaseKey');
    if (urlInput) urlInput.value = url;
    if (keyInput) keyInput.value = key;
    document.getElementById('connectionDot').classList.add('connected');
    document.getElementById('connectionLabel').textContent = 'Connected ✓';
    // Load saved data
    loadSavedTasks();
    fetchReminders();
    initGrindCalendar();
  } catch (err) {
    console.error('supabaseClient connection failed:', err);
    showToast('❌', 'Connection failed: ' + err.message, true);
  }
}

/** Connect button handler (for manual override) */
document.getElementById('btnConnect').addEventListener('click', () => {
  const url = document.getElementById('supabaseUrl').value.trim();
  const key = document.getElementById('supabaseKey').value.trim();
  if (!url || !key) {
    showToast('⚠️', 'Please enter both URL and Key.', true);
    return;
  }
  initSupabase(url, key);
  showToast('✅', 'Connected to supabaseClient!');
});

// ★ Auto-connect on load!
initSupabase(SUPABASE_URL, SUPABASE_ANON_KEY);


// ============================================
// 9. REMINDERS — CRUD + Polling
// ============================================

/** Save a new reminder to supabaseClient */
document.getElementById('btnSaveReminder').addEventListener('click', async () => {
  const noteEl = document.getElementById('reminderNote');
  const dtEl = document.getElementById('reminderDatetime');
  const note = noteEl.value.trim();
  const dt = dtEl.value;

  if (!note || !dt) {
    showToast('⚠️', 'Please enter a note and pick a date/time.', true);
    return;
  }

  if (!supabaseClient) {
    showToast('⚠️', 'Connect to supabaseClient first (Settings tab).', true);
    return;
  }

  const { error } = await supabaseClient
    .from('reminders')
    .insert([{ note: note, reminder_time: new Date(dt).toISOString() }]);

  if (error) {
    showToast('❌', 'Save failed: ' + error.message, true);
  } else {
    showToast('✅', 'Reminder saved!');
    noteEl.value = '';
    dtEl.value = '';
    fetchReminders();
  }
});

/** Fetch all reminders from supabaseClient and render the list */
async function fetchReminders() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient
    .from('reminders')
    .select('*')
    .order('reminder_time', { ascending: true });

  if (error) {
    console.error('Fetch reminders error:', error);
    return;
  }

  const listEl = document.getElementById('reminderList');
  const noRemEl = document.getElementById('noReminders');

  if (!data || data.length === 0) {
    listEl.innerHTML = '';
    listEl.appendChild(noRemEl);
    noRemEl.style.display = 'block';
    return;
  }

  noRemEl.style.display = 'none';
  listEl.innerHTML = '';

  data.forEach(rem => {
    const d = new Date(rem.reminder_time);
    const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const item = document.createElement('div');
    item.className = 'reminder-item';
    item.innerHTML = `
      <span class="reminder-bell">${rem.is_triggered ? '✅' : '🔔'}</span>
      <div class="reminder-info">
        <div class="reminder-note">${escapeHtml(rem.note)}</div>
        <div class="reminder-datetime">${dateStr} at ${timeStr}</div>
        ${rem.is_triggered ? '<div class="reminder-triggered">Triggered</div>' : ''}
      </div>
      <button class="btn-delete-reminder" data-id="${rem.id}" title="Delete">✕</button>
    `;
    listEl.appendChild(item);
  });

  // Attach delete handlers
  listEl.querySelectorAll('.btn-delete-reminder').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const { error } = await supabaseClient.from('reminders').delete().eq('id', id);
      if (!error) {
        showToast('🗑️', 'Reminder deleted.');
        fetchReminders();
      }
    });
  });
}

/** Escape HTML to prevent XSS */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ============================================
// 10. REMINDER POLLING (Every 60 seconds)
// ============================================

/**
 * Checks supabaseClient for any untriggered reminders whose time
 * has arrived. Fires browser notification + in-app modal.
 */
async function checkReminders() {
  if (!supabaseClient) return;

  const now = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from('reminders')
    .select('*')
    .eq('is_triggered', false)
    .lte('reminder_time', now);

  if (error || !data || data.length === 0) return;

  // Fire each due reminder
  for (const rem of data) {
    // 1. Show in-app modal
    showReminderModal(rem.note);

    // 2. Browser notification (if permitted)
    if (Notification.permission === 'granted') {
      new Notification('🔔 The Grind Tracker', {
        body: rem.note,
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png'
      });
    }

    // 3. Mark as triggered in supabaseClient
    await supabaseClient
      .from('reminders')
      .update({ is_triggered: true })
      .eq('id', rem.id);
  }

  // Refresh the list
  fetchReminders();
}

// Poll every 60 seconds
setInterval(checkReminders, 60000);
// Also check right away on load
setTimeout(checkReminders, 3000);


// ============================================
// 11. IN-APP MODAL (Reminder popup)
// ============================================
const modalOverlay = document.getElementById('reminderModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const btnDismiss = document.getElementById('btnDismissModal');

function showReminderModal(noteText) {
  modalTitle.textContent = '🔔 Reminder!';
  modalBody.textContent = noteText;
  modalOverlay.classList.add('show');
}

btnDismiss.addEventListener('click', () => {
  modalOverlay.classList.remove('show');
});

// Close modal by clicking overlay background
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('show');
  }
});


// ============================================
// 12. NOTIFICATION PERMISSION
// ============================================
function updateNotifStatus() {
  const dot = document.getElementById('notifDot');
  const label = document.getElementById('notifLabel');
  if (Notification.permission === 'granted') {
    dot.classList.add('connected');
    label.textContent = 'Notifications enabled ✓';
  } else if (Notification.permission === 'denied') {
    label.textContent = 'Notifications blocked ✕';
  } else {
    label.textContent = 'Permission not granted';
  }
}

document.getElementById('btnEnableNotifs').addEventListener('click', async () => {
  const result = await Notification.requestPermission();
  updateNotifStatus();
  if (result === 'granted') {
    showToast('🔔', 'Notifications enabled!');
  } else {
    showToast('⚠️', 'Notification permission denied.', true);
  }
});

// Check status on load
updateNotifStatus();


// ============================================
// 13. TOAST NOTIFICATION SYSTEM
// ============================================
const toastContainer = document.getElementById('toastContainer');

/**
 * Show a small toast notification.
 * @param {string} icon - Emoji icon
 * @param {string} msg  - Message text
 * @param {boolean} isError - If true, shows red border
 */
function showToast(icon, msg, isError = false) {
  const toast = document.createElement('div');
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${msg}</span>
  `;
  toastContainer.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}


// ============================================
// 14. COURSE PROGRESS TRACKING + CHARTS
// ============================================

/**
 * Course configurations based on user's actual schedule.
 * All courses started on 01-03-2026.
 */
const COURSES = {
  dataScience: {
    name: 'Data Science & AI',
    startDate: new Date('2026-03-01'),
    lectureHours: 120,        // 120 hrs of lecture content
    practiceHours: 60,        // 60 hrs of practice
    dailyLecture: 2,          // 2 hrs lecture per day
    dailyPractice: 1,         // 1 hr practice per day
    get totalHours() { return this.lectureHours + this.practiceHours; }, // 180 hrs
    get totalDays() { return this.lectureHours / this.dailyLecture; },  // 60 days
    icon: '📊',
    color: 'rgba(184, 242, 71, 0.8)',
    borderColor: '#b8f247'
  },
  webDev: {
    name: 'Web Development',
    startDate: new Date('2026-03-01'),
    totalDays: 120,           // 120-day course
    // Pattern: Day 1 = 2hrs lecture, Day 2 = 1hr practice (alternating)
    dailyPattern: [2, 1],     // alternating hours
    get totalHours() {
      // 60 lecture days × 2hrs + 60 practice days × 1hr = 180 hrs
      return (this.totalDays / 2) * this.dailyPattern[0] + (this.totalDays / 2) * this.dailyPattern[1];
    },
    icon: '🌐',
    color: 'rgba(168, 85, 247, 0.8)',
    borderColor: '#a855f7'
  },
  dsa: {
    name: 'DSA (Data Structures & Algorithms)',
    startDate: new Date('2026-03-01'),
    lectureHours: 70,         // 70 hrs of lecture content
    dailyLecture: 1,          // 1 hr lecture (Block 1)
    dailyPractice: 1.5,       // 1.5 hrs practice (Block 2)
    get practiceHours() { return this.lectureHours * this.dailyPractice; }, // 105 hrs
    get totalHours() { return this.lectureHours + this.practiceHours; },    // 175 hrs
    get totalDays() { return this.lectureHours / this.dailyLecture; },     // 70 days
    icon: '💻',
    color: 'rgba(96, 165, 250, 0.8)',
    borderColor: '#60a5fa'
  }
};

/**
 * Calculate how many days have elapsed since a course start date.
 * @returns {number} days elapsed (0-indexed, day 1 = first day)
 */
function getDaysElapsed(startDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const diffMs = today - start;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Get end date for a course.
 */
function getEndDate(startDate, totalDays) {
  const end = new Date(startDate);
  end.setDate(end.getDate() + totalDays - 1);
  return end;
}

/**
 * Format date as "DD Mon YYYY"
 */
function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Calculate progress for each course.
 */
function getCourseProgress() {
  const progress = {};

  // --- Data Science ---
  const dsElapsed = getDaysElapsed(COURSES.dataScience.startDate);
  const dsDay = Math.min(dsElapsed + 1, COURSES.dataScience.totalDays); // current day number
  const dsCompleted = Math.min(dsElapsed, COURSES.dataScience.totalDays);
  const dsLectureDone = dsCompleted * COURSES.dataScience.dailyLecture;
  const dsPracticeDone = dsCompleted * COURSES.dataScience.dailyPractice;
  const dsPercent = Math.round((dsCompleted / COURSES.dataScience.totalDays) * 100);
  progress.dataScience = {
    day: dsDay,
    totalDays: COURSES.dataScience.totalDays,
    lectureDone: Math.min(dsLectureDone, COURSES.dataScience.lectureHours),
    practiceDone: Math.min(dsPracticeDone, COURSES.dataScience.practiceHours),
    totalDone: Math.min(dsLectureDone + dsPracticeDone, COURSES.dataScience.totalHours),
    percent: Math.min(dsPercent, 100),
    remaining: Math.max(COURSES.dataScience.totalDays - dsCompleted, 0),
    endDate: getEndDate(COURSES.dataScience.startDate, COURSES.dataScience.totalDays),
    isComplete: dsCompleted >= COURSES.dataScience.totalDays
  };

  // --- Web Dev ---
  const wdElapsed = getDaysElapsed(COURSES.webDev.startDate);
  const wdDay = Math.min(wdElapsed + 1, COURSES.webDev.totalDays);
  const wdCompleted = Math.min(wdElapsed, COURSES.webDev.totalDays);
  let wdHoursDone = 0;
  for (let i = 0; i < wdCompleted; i++) {
    wdHoursDone += COURSES.webDev.dailyPattern[i % 2]; // alternating 2hr, 1hr
  }
  const wdPercent = Math.round((wdCompleted / COURSES.webDev.totalDays) * 100);
  const wdIsLectureDay = (wdElapsed % 2) === 0; // even days = lecture, odd = practice
  progress.webDev = {
    day: wdDay,
    totalDays: COURSES.webDev.totalDays,
    hoursDone: Math.min(wdHoursDone, COURSES.webDev.totalHours),
    percent: Math.min(wdPercent, 100),
    remaining: Math.max(COURSES.webDev.totalDays - wdCompleted, 0),
    endDate: getEndDate(COURSES.webDev.startDate, COURSES.webDev.totalDays),
    isLectureDay: wdIsLectureDay,
    todayHours: wdIsLectureDay ? 2 : 1,
    todayType: wdIsLectureDay ? 'Lecture' : 'Practice',
    isComplete: wdCompleted >= COURSES.webDev.totalDays
  };

  // --- DSA ---
  const dsaElapsed = getDaysElapsed(COURSES.dsa.startDate);
  const dsaDay = Math.min(dsaElapsed + 1, COURSES.dsa.totalDays);
  const dsaCompleted = Math.min(dsaElapsed, COURSES.dsa.totalDays);
  const dsaLectureDone = dsaCompleted * COURSES.dsa.dailyLecture;
  const dsaPracticeDone = dsaCompleted * COURSES.dsa.dailyPractice;
  const dsaPercent = Math.round((dsaCompleted / COURSES.dsa.totalDays) * 100);
  progress.dsa = {
    day: dsaDay,
    totalDays: COURSES.dsa.totalDays,
    lectureDone: Math.min(dsaLectureDone, COURSES.dsa.lectureHours),
    practiceDone: Math.min(dsaPracticeDone, COURSES.dsa.practiceHours),
    totalDone: Math.min(dsaLectureDone + dsaPracticeDone, COURSES.dsa.totalHours),
    percent: Math.min(dsaPercent, 100),
    remaining: Math.max(COURSES.dsa.totalDays - dsaCompleted, 0),
    endDate: getEndDate(COURSES.dsa.startDate, COURSES.dsa.totalDays),
    isComplete: dsaCompleted >= COURSES.dsa.totalDays
  };

  return progress;
}


/**
 * Inject today's course info into the expandable study blocks.
 * Uses data-block-id to find each block's expand-inner container.
 */
function renderCourseBlockInfo() {
  const p = getCourseProgress();

  /**
   * Helper: find the expand-inner div for a block by its data-block-id.
   */
  function getExpandEl(blockId) {
    const block = document.querySelector(`[data-block-id="${blockId}"]`);
    return block ? block.querySelector('.expand-inner') : null;
  }

  // --- DSA Block 1 (Lecture — 1hr) ---
  const dsa1El = document.getElementById('dsa1CourseProgress') || getExpandEl('dsa_block_1');
  if (dsa1El) {
    dsa1El.innerHTML = `
      <div class="course-progress-mini">
        <div class="course-badge">Day ${p.dsa.day} of ${p.dsa.totalDays}</div>
        <div class="course-progress-bar">
          <div class="progress-fill" style="width:${p.dsa.percent}%; background:${COURSES.dsa.borderColor};"></div>
        </div>
        <div class="course-stats">
          <span>📖 Lecture: ${p.dsa.lectureDone}/${COURSES.dsa.lectureHours} hrs done</span>
          <span>🎯 ${p.dsa.percent}% complete</span>
        </div>
        <p class="meal-tip">💡 1 hr video concepts today. Focus on understanding, not speed. ${p.dsa.remaining} days remaining → ends ${formatDate(p.dsa.endDate)}</p>
      </div>
    `;
  }

  // --- DSA Block 2 (Practice — 1.5hrs) ---
  const dsa2El = document.getElementById('dsa2CourseProgress') || getExpandEl('dsa_block_2');
  if (dsa2El) {
    dsa2El.innerHTML = `
      <div class="course-progress-mini">
        <div class="course-badge">Day ${p.dsa.day} of ${p.dsa.totalDays}</div>
        <div class="course-progress-bar">
          <div class="progress-fill" style="width:${p.dsa.percent}%; background:${COURSES.dsa.borderColor};"></div>
        </div>
        <div class="course-stats">
          <span>⌨️ Practice: ${p.dsa.practiceDone}/${COURSES.dsa.practiceHours} hrs done</span>
          <span>🎯 ${p.dsa.percent}% complete</span>
        </div>
        <p class="meal-tip">💡 1.5 hrs of DSA problem-solving. Apply today's lecture concepts. Code at least 2-3 problems.</p>
      </div>
    `;
  }

  // --- Data Science (2hr lecture + 1hr practice) ---
  const dsciEl = getExpandEl('data_science');
  if (dsciEl) {
    dsciEl.innerHTML = `
      <div class="course-progress-mini">
        <div class="course-badge">Day ${p.dataScience.day} of ${p.dataScience.totalDays}</div>
        <div class="course-progress-bar">
          <div class="progress-fill" style="width:${p.dataScience.percent}%; background:${COURSES.dataScience.borderColor};"></div>
        </div>
        <div class="course-stats">
          <span>📖 Lecture: ${p.dataScience.lectureDone}/${COURSES.dataScience.lectureHours} hrs</span>
          <span>🧪 Practice: ${p.dataScience.practiceDone}/${COURSES.dataScience.practiceHours} hrs</span>
          <span>🎯 ${p.dataScience.percent}%</span>
        </div>
        <p class="meal-tip">💡 Today: 2 hrs lecture + 1 hr practice. ${p.dataScience.remaining} days left → ends ${formatDate(p.dataScience.endDate)}</p>
      </div>
    `;
  }

  // --- Web Dev (alternating 2hr lecture / 1hr practice) ---
  const wdEl = getExpandEl('web_dev');
  if (wdEl) {
    wdEl.innerHTML = `
      <div class="course-progress-mini">
        <div class="course-badge">Day ${p.webDev.day} of ${p.webDev.totalDays}</div>
        <div class="course-progress-bar">
          <div class="progress-fill" style="width:${p.webDev.percent}%; background:${COURSES.webDev.borderColor};"></div>
        </div>
        <div class="course-stats">
          <span>⏱️ ${p.webDev.hoursDone} hrs completed</span>
          <span>🎯 ${p.webDev.percent}%</span>
        </div>
        <p class="meal-tip">💡 Today is <strong>${p.webDev.todayType} Day</strong> — ${p.webDev.todayHours} hrs. ${p.webDev.remaining} days left → ends ${formatDate(p.webDev.endDate)}</p>
      </div>
    `;
  }
}

// Render on load
renderCourseBlockInfo();



/**
 * Initialize progress charts with REAL computed data.
 */
function initProgressCharts() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.color = '#9e9eb8';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.04)';
  Chart.defaults.font.family = 'Outfit';

  const p = getCourseProgress();

  // --- 1) Body Measurement Analytics (Line Chart) ---
  const bCtx = document.getElementById('bodyStatsChart');
  let bodyChartInstance = null;

  const renderBodyChart = async () => {
    if (!bCtx) return;

    let bodyData = [];

    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('body_measurements')
        .select('*')
        .order('month_date', { ascending: true });

      if (!error && data && data.length > 0) {
        bodyData = data.map(d => ({
          month: d.month_date.substring(0, 7),
          weight: parseFloat(d.weight),
          chest: parseFloat(d.chest),
          biceps: parseFloat(d.biceps)
        }));
      }
    }

    // Load from LocalStorage (Fallback mock data if empty)
    if (bodyData.length === 0) {
      bodyData = JSON.parse(localStorage.getItem('grind_body_stats'));
      if (!bodyData || bodyData.length === 0) {
        bodyData = [
          { month: '2026-01', weight: 49.5, chest: 34.0, biceps: 11.0 },
          { month: '2026-02', weight: 50.0, chest: 34.5, biceps: 11.2 },
          { month: '2026-03', weight: 50.5, chest: 35.0, biceps: 11.5 }
        ];
        localStorage.setItem('grind_body_stats', JSON.stringify(bodyData));
      }
    }

    // Sort by month chronologically
    bodyData.sort((a, b) => a.month.localeCompare(b.month));

    const labels = bodyData.map(d => {
      const [year, month] = d.month.split('-');
      const date = new Date(year, parseInt(month) - 1);
      return date.toLocaleString('en-IN', { month: 'short' });
    });
    const weightData = bodyData.map(d => d.weight);
    const chestData = bodyData.map(d => d.chest);
    const bicepsData = bodyData.map(d => d.biceps);

    if (bodyChartInstance) bodyChartInstance.destroy();

    const metricSelector = document.getElementById('metricSelector');
    const selectedMetric = metricSelector ? metricSelector.value : 'weight';

    const datasetsConf = {
      'weight': {
        label: 'Weight (kg)',
        data: weightData,
        borderColor: '#b8f247', // lime
        backgroundColor: 'rgba(184, 242, 71, 0.15)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#b8f247'
      },
      'chest': {
        label: 'Chest (in)',
        data: chestData,
        borderColor: '#60a5fa', // blue
        backgroundColor: 'rgba(96, 165, 250, 0.15)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#60a5fa'
      },
      'biceps': {
        label: 'Biceps (in)',
        data: bicepsData,
        borderColor: '#f472b6', // pink
        backgroundColor: 'rgba(244, 114, 182, 0.15)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#f472b6'
      }
    };

    bodyChartInstance = new Chart(bCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [datasetsConf[selectedMetric]]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, color: '#e2e8f0' } }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: {
            beginAtZero: false,
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          } // measurements don't start at 0, allows auto-scaling for small changes
        }
      }
    });

    const bodyLegend = document.getElementById('bodyStatsChartLegend');
    if (bodyLegend && bodyData.length > 0) {
      bodyLegend.textContent = `Last updated: ${labels[labels.length - 1]}`;
    }
  };

  const metricSelector = document.getElementById('metricSelector');
  if (metricSelector) {
    metricSelector.addEventListener('change', () => {
      renderBodyChart();
    });
  }

  renderBodyChart();

  // Measurement Modal Toggles
  const btnOpenMeasurementModal = document.getElementById('btnOpenMeasurementModal');
  const measurementModal = document.getElementById('measurementModal');
  const btnCancelMeasurement = document.getElementById('btnCancelMeasurement');

  if (btnOpenMeasurementModal && measurementModal) {
    btnOpenMeasurementModal.addEventListener('click', () => {
      measurementModal.classList.add('show');
    });
  }

  if (btnCancelMeasurement && measurementModal) {
    btnCancelMeasurement.addEventListener('click', () => {
      measurementModal.classList.remove('show');
    });
  }

  // Attach Save Handler for Body Measurements
  const btnSaveMeasurement = document.getElementById('btnSaveMeasurement');
  if (btnSaveMeasurement) {
    btnSaveMeasurement.onclick = async () => {
      const monthStr = document.getElementById('measureMonth').value;
      const weightStr = document.getElementById('measureWeight').value;
      const chestStr = document.getElementById('measureChest').value;
      const bicepsStr = document.getElementById('measureBiceps').value;

      if (!monthStr || !weightStr || !chestStr || !bicepsStr) {
        showToast('❌', 'Please fill all measurement fields!', true);
        return;
      }

      const w = parseFloat(weightStr);
      const c = parseFloat(chestStr);
      const b = parseFloat(bicepsStr);

      if (supabaseClient) {
        const monthDate = `${monthStr}-01`;
        const { error } = await supabaseClient
          .from('body_measurements')
          .upsert({ month_date: monthDate, weight: w, chest: c, biceps: b }, { onConflict: 'month_date' });

        if (error) {
          showToast('❌', 'DB Error: ' + error.message, true);
        } else {
          showToast('💪', 'Saved to Database successfully!');
        }
      } else {
        let bodyData = JSON.parse(localStorage.getItem('grind_body_stats')) || [];
        const existingIdx = bodyData.findIndex(d => d.month === monthStr);
        const newEntry = { month: monthStr, weight: w, chest: c, biceps: b };

        if (existingIdx >= 0) {
          bodyData[existingIdx] = newEntry;
        } else {
          bodyData.push(newEntry);
        }
        localStorage.setItem('grind_body_stats', JSON.stringify(bodyData));
        showToast('📥', 'Saved locally (Offline Mode)');
      }

      // Clear form & Close
      document.getElementById('measureMonth').value = '';
      document.getElementById('measureWeight').value = '';
      document.getElementById('measureChest').value = '';
      document.getElementById('measureBiceps').value = '';
      if (measurementModal) measurementModal.classList.remove('show');
      renderBodyChart();
    };
  }

  // --- 2) DSA LeetCode Analytics (Doughnut Chart) ---
  const renderLeetcodeChart = async () => {
    const lCtx = document.getElementById('leetcodeChart');
    if (!lCtx) return;

    let easy = 45, med = 15, hard = 2; // Default Mock Progress

    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('leetcode_stats').select('easy_count, medium_count, hard_count');
      if (!error && data && data.length > 0) {
        // Sum all days logged in DB
        easy = data.reduce((sum, row) => sum + (row.easy_count || 0), 0);
        med = data.reduce((sum, row) => sum + (row.medium_count || 0), 0);
        hard = data.reduce((sum, row) => sum + (row.hard_count || 0), 0);
      }
    }

    if (window.leetcodeChartInstance) window.leetcodeChartInstance.destroy();

    window.leetcodeChartInstance = new Chart(lCtx, {
      type: 'doughnut',
      data: {
        labels: [`Easy (${easy})`, `Medium (${med})`, `Hard (${hard})`],
        datasets: [{
          data: [easy, med, hard],
          backgroundColor: ['#00b8a3', '#ffc01e', '#ff375f'],
          borderColor: '#22222f',
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { position: 'right', labels: { usePointStyle: true, font: { size: 12 } } }
        }
      }
    });
  };

  renderLeetcodeChart();

  // LeetCode UI Tracker (+/- buttons in Timetable)
  let lcEasy = 0, lcMed = 0, lcHard = 0;

  const updateLcUI = () => {
    const eTxt = document.getElementById('txtLcEasy');
    const mTxt = document.getElementById('txtLcMed');
    const hTxt = document.getElementById('txtLcHard');
    if (eTxt) eTxt.textContent = lcEasy;
    if (mTxt) mTxt.textContent = lcMed;
    if (hTxt) hTxt.textContent = lcHard;
  };

  document.getElementById('btnLcEasyPlus')?.addEventListener('click', () => { lcEasy++; updateLcUI(); });
  document.getElementById('btnLcEasyMinus')?.addEventListener('click', () => { if (lcEasy > 0) lcEasy--; updateLcUI(); });
  document.getElementById('btnLcMedPlus')?.addEventListener('click', () => { lcMed++; updateLcUI(); });
  document.getElementById('btnLcMedMinus')?.addEventListener('click', () => { if (lcMed > 0) lcMed--; updateLcUI(); });
  document.getElementById('btnLcHardPlus')?.addEventListener('click', () => { lcHard++; updateLcUI(); });
  document.getElementById('btnLcHardMinus')?.addEventListener('click', () => { if (lcHard > 0) lcHard--; updateLcUI(); });

  document.getElementById('btnSaveLeetcode')?.addEventListener('click', async () => {
    if (!supabaseClient) {
      showToast('⚠️', 'Please connect to Supabase first!', true);
      return;
    }

    // Format YYYY-MM-DD
    const today = new Date();
    const isoDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const { error } = await supabaseClient
      .from('leetcode_stats')
      .upsert({ solve_date: isoDate, easy_count: lcEasy, medium_count: lcMed, hard_count: lcHard }, { onConflict: 'solve_date' });

    if (error) {
      showToast('❌', 'Error saving LeetCode: ' + error.message, true);
    } else {
      showToast('🚀', 'Today\'s LeetCode stats saved to DB!');
      renderLeetcodeChart(); // refresh doughnut
    }
  });

  // --- 3) Course Analytics (3 Separate Circles) ---
  const createCircle = (id, percent, color, bg) => {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percent, 100 - percent],
          backgroundColor: [color, bg],
          borderWidth: 0,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      },
      plugins: [{
        id: 'textCenter',
        beforeDraw: function (chart) {
          var width = chart.width, height = chart.height, ctx = chart.ctx;
          ctx.restore();
          var fontSize = (height / 80).toFixed(2);
          ctx.font = "bold " + fontSize + "em Outfit";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
          var text = percent + "%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }]
    });
  };

  createCircle('dsCircleChart', p.dataScience.percent, COURSES.dataScience.color, 'rgba(255,255,255,0.05)');
  createCircle('wdCircleChart', p.webDev.percent, COURSES.webDev.color, 'rgba(255,255,255,0.05)');
  createCircle('dsaCircleChart', p.dsa.percent, COURSES.dsa.color, 'rgba(255,255,255,0.05)');

  // Update chart legends
  const cLegend = document.getElementById('courseChartLegend');
  if (cLegend) {
    cLegend.textContent = `All courses started 1 Mar 2026. DS: ${p.dataScience.remaining}d left · WebDev: ${p.webDev.remaining}d left · DSA: ${p.dsa.remaining}d left`;
  }
}

/**
 * Render the GitHub-style Grind Calendar (last 365 days).
 * Colors cells based on supabaseClient `streaks` data.
 */
async function initGrindCalendar() {
  const grid = document.getElementById('grindCalendarGrid');
  const monthsContainer = document.getElementById('calendarMonths');
  if (!grid || !monthsContainer) return;

  grid.innerHTML = '';
  monthsContainer.innerHTML = '';

  const today = new Date();

  // Fixed Start Date: March 1, 2026
  const exactStart = new Date(2026, 2, 1);
  const startDate = new Date(exactStart);

  // Align start date to Sunday (0) for 7-row grid alignment
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Render exactly 53 weeks (371 days) starting from that Sunday
  const totalDays = 371;
  const totalWeeks = 53;

  grid.style.gridTemplateColumns = `repeat(${totalWeeks}, 13px)`;

  const cellsMap = {};
  const monthsMap = {};

  let currentDate = new Date(startDate);
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(currentDate);
    const dateStr = d.toISOString().split('T')[0];
    const month = d.toLocaleString('en-IN', { month: 'short' });

    if (d.getDate() === 1 || i === 0) {
      if (!monthsMap[month] || i === 0) {
        monthsMap[month] = Math.floor(i / 7);
      }
    }

    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    cell.dataset.date = dateStr;
    cell.dataset.level = '0';

    // Default tooltip
    const displayDate = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    cell.dataset.tooltip = `No activity on ${displayDate}`;

    if (dateStr === today.toISOString().split('T')[0]) {
      cell.classList.add('cal-today');
    }

    grid.appendChild(cell);
    cellsMap[dateStr] = cell;

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Render Month Labels securely spaced using absolute positioning for exact column alignment
  monthsContainer.style.position = 'relative';
  monthsContainer.style.height = '15px';
  monthsContainer.style.display = 'block';

  for (const [month, weekIdx] of Object.entries(monthsMap)) {
    const span = document.createElement('span');
    span.textContent = month;
    span.style.position = 'absolute';
    // 28px is the width of the weekday labels column, 16px is cell width + gap
    // Use smaller font and ensure first month isn't pushed too far
    span.style.left = `${28 + (weekIdx * 16)}px`;
    span.style.fontSize = '0.65rem';
    span.style.fontWeight = '600';
    span.style.color = 'var(--text-muted)';
    monthsContainer.appendChild(span);
  }

  // Fetch Streaks from supabaseClient
  let fetchedData = [];
  if (supabaseClient) {
    const startStr = startDate.toISOString().split('T')[0];
    const { data, error } = await supabaseClient
      .from('streaks')
      .select('streak_date, tasks_completed, tasks_total')
      .gte('streak_date', startStr);

    if (error) {
      console.warn('Supabase fetch failed (Offline/Invalid Key), falling back to mock data:', error);
    } else if (data) {
      fetchedData = data;
    }
  }

  // Mock initial app usage on March 1st-4th 2026 to light up the calendar
  const streakMap = new Map();
  fetchedData.forEach(d => streakMap.set(d.streak_date, d));

  const mockDates = ['2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04'];
  mockDates.forEach(date => {
    streakMap.set(date, { streak_date: date, tasks_completed: 12, tasks_total: 12 });
  });

  const streaksArray = Array.from(streakMap.values());

  let totalGrindCount = 0;
  streaksArray.forEach(record => {
    const cell = cellsMap[record.streak_date];
    if (cell) {

      const done = record.tasks_completed || 0;
      const total = record.tasks_total || 12;
      totalGrindCount += done;

      let level = 0;
      if (done > 0) {
        const percent = done / total;
        if (percent <= 0.25) level = 1;
        else if (percent <= 0.5) level = 2;
        else if (percent <= 0.75) level = 3;
        else level = 4;
      }

      cell.dataset.level = level;

      const d = new Date(record.streak_date);
      const displayDate = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
      cell.dataset.tooltip = `${done} task${done !== 1 ? 's' : ''} completed on ${displayDate}`;
    }
  });

  const totalEl = document.getElementById('grindTotal');
  if (totalEl) {
    totalEl.innerHTML = `<strong>${totalGrindCount}</strong> tasks completed in the last year`;
  }
}


// Init charts on load
initProgressCharts();


// ============================================
// 15. SERVICE WORKER REGISTRATION
// ============================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  });
}


// ============================================
// 16. INITIAL STATE
// ============================================
// Set initial tasks done count
updateTasksDoneCount();

console.log('🔥 The Grind Tracker loaded successfully!');
