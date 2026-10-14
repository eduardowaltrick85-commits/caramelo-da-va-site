(function () {
  var WA = "554931912542";
  var IG_DIRECT = "https://ig.me/m/caramelo_da_va";
  function wa(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = wa(a.getAttribute("data-wa"));
    a.target = "_blank"; a.rel = "noopener";
  });

  // Planos (conteudo do PDF oficial, sem precos)
  var C = "Consulta a domicílio com médico geral", P = "Aferição de pressão";
  var EX = ["Radiografia", "Ultrassom", "Exame de sangue", "Hemograma", "Leucograma"];
  var plans = {
    "checkup-cao": { title: "Check-up cão", tiers: [
      { n: "Bronze", i: [C, P] },
      { n: "Prata", i: [C, P].concat(EX) },
      { n: "Ouro", tag: "Mais escolhido", i: [C, P].concat(EX, ["Eletrocardiograma"]) },
      { n: "Diamante", i: [C, "Consulta on-line geral", P].concat(EX, ["Eletrocardiograma"]) }
    ]},
    "checkup-gato": { title: "Check-up gato", tiers: [
      { n: "Bronze", i: [C, P] },
      { n: "Prata", i: [C, P, "Teste FIV/FeLV"].concat(EX) },
      { n: "Ouro", tag: "Mais completo", i: [C, P, "Teste FIV/FeLV"].concat(EX, ["Eletrocardiograma"]) }
    ]},
    "filhote-cao": { title: "Cão filhote (5 a 10 kg)", tiers: [
      { n: "Bronze Baby", sub: "O mais econômico", i: ["Avaliação pediátrica com clínico geral", "Vacina Óctupla importada", "Vacina da Raiva importada", "Vermífugo Vetmax", "Antipulgas Simparic"] },
      { n: "Prata Baby", sub: "Equilíbrio entre custo e cuidado", tag: "Mais escolhido", i: ["Avaliação pediátrica com clínico geral", "Vacina Óctupla importada", "Vacina Gripe Nasal", "Vacina da Raiva importada", "Vermífugo Vetmax", "Antipulgas Vetmax"] },
      { n: "Ouro Baby", sub: "Cobertura completa com benefícios extras", i: ["Avaliação pediátrica com clínico geral", "Vacina Óctupla importada", "Vacina Gripe Nasal", "Vacina da Raiva importada", "Vacina Giárdia", "Vermífugo Vetmax", "Antipulgas Vetmax"] }
    ]},
    "adulto-cao": { title: "Cão adulto", tiers: [
      { n: "Bronze", i: ["Consulta com clínico geral", "Vacina Óctupla importada", "Vacina da Raiva importada", "Antipulgas Simparic"] },
      { n: "Prata", tag: "Mais escolhido", i: ["Consulta com clínico geral", "Vacina Óctupla importada", "Vacina da Raiva importada", "Vacina Gripe Nasal", "Vermífugo Vetmax", "Antipulgas Simparic"] },
      { n: "Ouro", i: ["Consulta com clínico geral", "Vacina Óctupla importada", "Vacina da Raiva importada", "Vacina Gripe Nasal", "Vacina Giárdia", "Vermífugo Vetmax", "Antipulgas Simparic"] }
    ]},
    "filhote-gato": { title: "Gato filhote", tiers: [
      { n: "Prata", i: ["Avaliação pediátrica", "Vacina Quádrupla importada", "Vacina da Raiva", "Vermífugo"] },
      { n: "Ouro", tag: "Mais completo", i: ["Avaliação pediátrica", "Vacina Quádrupla importada", "Vacina da Raiva", "Vermífugo", "Antipulgas", "Teste FIV/FeLV"] }
    ]},
    "adulto-gato": { title: "Gato adulto", tiers: [
      { n: "Prata", i: ["Avaliação com clínico geral", "Vacina Quádrupla importada", "Vacina da Raiva", "Vermífugo"] },
      { n: "Ouro", tag: "Mais completo", i: ["Avaliação com clínico geral", "Vacina Quádrupla importada", "Vacina da Raiva", "Antipulgas", "Vermífugo", "Teste FIV/FeLV"] }
    ]}
  };

  var root = document.getElementById("plansRoot");
  var check = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3.2 3L15 6.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var dm = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.6c.9.2 1.8.4 2.7.4 5 0 9-3.7 9-8.3S17 3 12 3Zm.9 11.2-2.3-2.4-4.4 2.4 4.8-5.1 2.3 2.4 4.4-2.4-4.8 5.1Z" fill="currentColor"/></svg>';
  Object.keys(plans).forEach(function (key, idx) {
    var p = plans[key];
    var panel = document.createElement("div");
    panel.className = "panel"; panel.id = "p-" + key; panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "t-" + key);
    if (idx) panel.hidden = true;
    panel.innerHTML = '<ul class="tiers tiers--' + p.tiers.length + '">' + p.tiers.map(function (t) {
      var name = p.title + " " + t.n;
      return '<li class="tier' + (t.tag ? " tier--hl" : "") + '">' +
        (t.tag ? '<span class="tier__tag">' + t.tag + "</span>" : "") +
        '<h3 class="tier__name">' + t.n + "</h3>" +
        (t.sub ? '<p class="tier__sub">' + t.sub + "</p>" : "") +
        '<ul class="tier__items">' + t.i.map(function (x) { return "<li>" + check + x + "</li>"; }).join("") + "</ul>" +
        '<div class="tier__cta"><a class="btn btn--block" target="_blank" rel="noopener" href="' +
          wa("Olá! Quero saber o orçamento do plano " + name + " do Caramelo da Van.") + '">Saber orçamento</a>' +
        '<a class="btn btn--ghost btn--block" target="_blank" rel="noopener" href="' + IG_DIRECT + '">' + dm + "Pedir no Direct</a></div></li>";
    }).join("") + "</ul>";
    root.appendChild(panel);
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); select(n); }
    });
  });

  // Som do video
  var v = document.getElementById("vanVideo"), b = document.querySelector(".sound");
  if (v && b) b.addEventListener("click", function () {
    v.muted = !v.muted; if (!v.muted) v.play();
    b.setAttribute("aria-pressed", String(!v.muted));
    b.querySelector("span").textContent = v.muted ? "Ativar som" : "Desativar som";
  });
})();
