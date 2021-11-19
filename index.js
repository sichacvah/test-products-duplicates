import fetch from 'node-fetch'


const fetchPage = (baseUrl, config, page = 1) => {
  console.log('PAGE_FETCHING', page)
  let queryString = `sid=${config.sid}&tid=${config.tid}&per_page=${config.per_page}&page=${page}`
  if (config.q) {
    queryString = `${queryString}&q=${config.q}`
  }
  const url = `${baseUrl}?${queryString}`
  return fetch(url, {
    method: 'get',
    headers: config.headers
  }).then(response => {
    return response.json()
  })
}

const extractIds = (products) => {
  return products.map(p => p.id)
}

const findDuplicates = (idsSet, ids) => {
  return ids.filter(id => idsSet.has(id))
}

const addToIds = (idsSet, ids) => {
  ids.forEach(id => {
    idsSet.add(id)
  })
}

export const main = (config) => {
  const idsSet = new Set()
  const duplicates = []
  let lastPage = 1
  const url = 'https://' + config.host + config.path
  const fetchAndExtract = (pageNumber = 1) => {
    return fetchPage(url, config, pageNumber).then(page => {
      console.log('PAGE', JSON.stringify(page, null, 2))
      const ids = extractIds(page.products)
      duplicates.push(...findDuplicates(idsSet, ids))
      addToIds(idsSet, ids)
      const nextPage = page.meta.next_page
      if (nextPage === lastPage) throw new Error(`Cycle nextPage - ${nextPage} equals lastPage - ${lastPage}`)
      if (nextPage) {
        lastPage = nextPage
        return fetchAndExtract(nextPage)
      }
      return Promise.resolve(duplicates)
    })
  }
  const fetchPages = () => {
    fetchAndExtract().then(items => {
      console.log('All ids set:', idsSet)
      console.log('Found duplicates ids:', items)
    })
  }

  fetchPages()
}

