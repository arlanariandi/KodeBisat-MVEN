const form = document.querySelector('#search-form')
const imageList = document.querySelector('#image-list')
const loader = document.querySelector('#loader')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const span = document.createElement('span')
    span.classList.add('loader')
    loader.append(span)


    document.querySelectorAll('img').forEach((img) => img.remove())

    const keyword = form.elements.query.value
    const config = {
        params: {q: keyword}
    }

    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)

        getImages(res.data)

    } catch (e) {
        console.error('Error fetching data:', e);
    } finally {
        form.elements.query.value = ''
        loader.remove()
    }
})

const getImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img')
            img.src = result.show.image.medium
            img.classList.add('rounded', 'mx-1', 'mb-3')
            imageList.append(img)
        }
    }
}
