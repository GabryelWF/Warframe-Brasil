async function carregarDados() {
    const [weaponsRes, imagesRes] = await Promise.all([
        fetch('assets/data/Weapons.json'),
        fetch('assets/data/Images.json')
    ])

    if (!weaponsRes.ok || !imagesRes.ok) {
        throw new Error('Erro ao buscar JSON')
    }

    const weaponsData = await weaponsRes.json()
    const imagesData = await imagesRes.json()

    return { weaponsData, imagesData }
}

function cruzarDados(weaponsData, imagesData) {
    const imagemPorUniqueName = {}
    imagesData.Manifest.forEach(item => {
        imagemPorUniqueName[item.uniqueName] = item.textureLocation
    })

    return weaponsData.ExportWeapons.map(arma => {
        const textura = imagemPorUniqueName[arma.uniqueName]
        const imgUrl = textura
            ? `https://content.warframe.com/PublicExport${textura}`
            : 'src/img/placeholder.png'

        return {
            name:               arma.name,
            uniqueName:         arma.uniqueName,
            imgUrl,
            descricao:          arma.description        ?? 'Sem descrição.',
            danoTotal:          arma.totalDamage        ?? 0,
            chanceCrit:         arma.criticalChance     ?? 0,
            multCrit:           arma.criticalMultiplier ?? 0,
            chanceStatus:       arma.procChance         ?? 0,
            taxaDisparo:        arma.fireRate           ?? 0,
            precisao:           arma.accuracy           ?? 0,
            tamanhoMagazine:    arma.magazineSize       ?? 0,
            tempoRecarga:       arma.reloadTime         ?? 0,
            masteriaReq:        arma.masteryReq         ?? 0,
            categoria:          arma.productCategory    ?? '',
            ruido:              arma.noise              ?? '',
            gatilho:            arma.trigger            ?? '',
        }
    })
}

function renderizarCards(armas) {
    const secao = document.querySelector('#builds-list')
    secao.innerHTML = ''

    armas.forEach(arma => {
        const card = document.createElement('button')
        card.className = 'card'
        card.innerHTML = `
            <img src="${arma.imgUrl}" alt="${arma.name}" class="card-img">
            <div class="card-info">
                <h3 class="card-titulo">${arma.name}</h3>
                <div class="card-tags">
                    <span class="tag tag-categoria">${arma.categoria}</span>
                    <span class="tag tag-maestria">MR ${arma.masteriaReq}</span>
                </div>
            </div>
        `
        card.onclick = () => abrirModal(arma)
        secao.appendChild(card)
    })
}

async function init() {
    try {
        const { weaponsData, imagesData } = await carregarDados()
        const armas = cruzarDados(weaponsData, imagesData)
        renderizarCards(armas)
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro)
    }
}

document.addEventListener('DOMContentLoaded', init)