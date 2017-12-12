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
      tr.classList.add('ant-table-row')
      tbody.appendChild(tr);
    });
  }

  let running = false;

  function run() {
    if (!running) {
      return;
    }
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
