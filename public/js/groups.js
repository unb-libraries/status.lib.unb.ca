window.onload = function () {
  getLinks().forEach(link => {
    link.onclick = event => {
      selectGroup(event.target)
    }
  })
}

function getLinks() {
  const root = document.getElementById('navbar-groups')
  return getElementsByClassName('nav-link', root)
}

function getElementsByClassName(className, root = document) {
  return [].concat(...root.getElementsByClassName(className))
}

function selectGroup(group) {
  toggleActive(group);

  const groupName = group.dataset.group || undefined;
  if (groupName) {
    getElementsByClassName('active-group')
      .forEach(item => {
        item.classList.remove('active-group')
      });
    getElementsByClassName(`group-${groupName}`)
      .forEach(item => {
        item.classList.add('active-group')
      })
  }
  else {
    getElementsByClassName(`site-item`)
      .forEach(item => {
        if (item.className.indexOf('active-group') < 0) {
          item.classList.add('active-group')
        }
      })
  }
}

function toggleActive(group) {
  getActive().classList.remove('active')
  group.classList.add('active');
}

function getActive() {
  return getLinks().filter(link => {
    return link.className.indexOf('active') > -1
  })[0]
}
