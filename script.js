function switchMode() {
  const mode = document.getElementById("modeSelect").value;
  document.getElementById("tdcMode").style.display = mode === "tdc" ? "block" : "none";
  document.getElementById("okaneMode").style.display = mode === "okane" ? "block" : "none";
}

const updateVal = (id, valId, suffix='') => {
  document.getElementById(valId).innerText = document.getElementById(id).value + suffix;
}
['tdc_target_speed', 'tdc_torpedo_speed', 'tdc_own_heading', 'tdc_target_course'].forEach(id => {
  const suffix = id.includes('heading') || id.includes('course') ? '°' : '';
  document.getElementById(id).addEventListener('input', () => updateVal(id, id + '_val', suffix));
});

function calcTDC() {
  const ts = parseFloat(document.getElementById("tdc_target_speed").value);
  const tp = parseFloat(document.getElementById("tdc_torpedo_speed").value);
  const hd = parseFloat(document.getElementById("tdc_own_heading").value);
  const tc = parseFloat(document.getElementById("tdc_target_course").value);

  const rel = (tc - hd + 360) % 360;
  const AOB = rel > 180 ? 360 - rel : rel;
  const lead = (ts / tp) * Math.sin(AOB * Math.PI / 180) * 57.3;
  const side = rel > 180 ? 'Port' : 'Starboard';
  document.getElementById("tdc_output").innerText = `Gyro angle: ${lead.toFixed(1)}° (${side})`;
}

function calcOkane() {
  const ts = parseFloat(document.getElementById("okane_target_speed").value);
  const tp = parseFloat(document.getElementById("okane_torpedo_speed").value);
  const hd = parseFloat(document.getElementById("okane_heading").value);
  const side = document.getElementById("okane_side").value;

  const lead = (ts / tp) * 57.3;
  const bearing = side === 'right' ? (hd + lead) % 360 : (hd - lead + 360) % 360;
  document.getElementById("okane_output").innerText = `Fire when target reaches bearing: ${bearing.toFixed(1)}°`;
}
