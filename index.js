(function() {
  let uid = 0;
  const getList = () => {
    const tableListDataSource = [];
    for (let i = 0; i < 500; i += 1) {
      tableListDataSource.push({
        no: uid,
        title: `A${uid}`,
        callNo: `B${uid}`,
        status: `C${uid}`,
        updatedAt: `D${uid}`,
      });

      uid += 1;
    }

    return tableListDataSource;
  };

  function createCell(row, text) {
    const textNode = document.createTextNode(text);
    const cell = document.createElement('td');
    cell.appendChild(textNode);
    row.appendChild(cell);
  }

  function render() {
    const list = getList();
    const tbody = document.querySelector('.ant-table-tbody');
    tbody.innerHTML = '';
    list.forEach(item => {
      const tr = document.createElement('tr');
      createCell(tr, item.no);
      createCell(tr, item.title);
      createCell(tr, item.callNo);
      createCell(tr, item.status);
      createCell(tr, item.updatedAt);
      createCell(tr, 'Delete');
      tbody.appendChild(tr);
    });
  }

  let running = false;

  const fps = document.querySelector('#fps');
  let lastUpdatedFps = new Date();
  let last = new Date();

  function run() {
    if (!running) {
      return;
    }
    var now = new Date();
    if (now - lastUpdatedFps > 1000) {
      fps.replaceChild(
        document.createTextNode((1000 / (now - last)).toFixed(1)),
        fps.firstChild
      );
      lastUpdatedFps = now;
    }
    last = now;
    render();
    window.requestAnimationFrame(run);
  }

  function stop() {
    running = false;
  }

  render();

  document.querySelector('#start').addEventListener('click', () => {
    running = true;
    run();
  });
  document.querySelector('#stop').addEventListener('click', stop);
})();
