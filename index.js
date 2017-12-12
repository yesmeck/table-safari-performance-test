(function() {
  let uid = 0;
  const getList = () => {
    const tableListDataSource = [];
    for (let i = 0; i < 500; i += 1) {
      tableListDataSource.push({
        key: uid,
        no: `TradeCode ${uid}`,
        title: `一个任务名称 ${i}`,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: `2017-07-01`,
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
      createCell(tr, '删除');
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
      fps.replaceChild(document.createTextNode((1000 / (now - last)).toFixed(1)), fps.firstChild);
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
