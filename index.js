(function() {
  let uid = 0;
  const getList = () => {
    const tableListDataSource = [];
    for (let i = 0; i < 2000; i += 1) {
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
    const tbody = document.querySelector('tbody');
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

  document.querySelectorAll('input').forEach(input => {
    const table = document.querySelector('table');
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        switch (e.target.value) {
          case 'width':
            table.style.width = '100%';
            break;
          case 'borderRadius':
            table.style.borderRadius = '4px 4px 0 0';
            break;
          case 'overflow':
            table.style.overflow = 'hidden';
            break;
        }
      } else {
        table.style[e.target.value] = null;
      }
    })
  });
})();
