
// EFEITO AO SCROLLAR

// Função para configurar um observador de interseção
function setupIntersectionObserver() {
    // Cria um novo IntersectionObserver
    const myObserver = new IntersectionObserver((entries) => {
        // Itera sobre cada entrada (elemento observado)
        entries.forEach((element) => {
            // Verifica se o elemento está intersectando a viewport
            if (element.isIntersecting) {
                // Adiciona a classe 'show' ao elemento alvo se estiver intersectando
                element.target.classList.add('show')
            } else {
                // Remove a classe 'show' do elemento alvo se não estiver intersectando
                element.target.classList.remove('show')
            }
        })
    })

    // Seleciona todos os elementos com a classe 'hidden'
    const elements = document.querySelectorAll('.hidden')
    // Itera sobre cada elemento selecionado
    elements.forEach((element) => {
        // Observa cada elemento
        myObserver.observe(element)
    })
}


// MENU HAMBURGUER
// Seleciona os elementos do DOM
const hamburger = document.querySelector(".hamburger") // Seleciona o botão de menu hamburguer
const nav = document.querySelector(".nav") // Seleciona o menu de navegação
const links = document.querySelectorAll('.js-link') // Seleciona todos os links do menu
const sections = document.querySelectorAll('section') // Seleciona todas as seções da página
let lastActiveLink = null // Variável para armazenar o último link ativo

// Função para alternar o menu hamburguer
function toggleHamburgerMenu() {
    // Alterna a classe 'active' no menu de navegação e no body para mostrar ou ocultar o menu
    nav.classList.toggle('active')
    document.body.classList.toggle('menu-open')

    // Se o menu estiver aberto e houver um último link ativo, destaca esse link novamente
    if (nav.classList.contains('active') && lastActiveLink) {
        links.forEach(link => link.classList.remove('actived'))
        lastActiveLink.classList.add('actived')
    }
}

// Função para fechar o menu ao clicar fora dele
function closeMenuOnClickOutside(event) {
    // Verifica se o clique ocorreu fora do menu e do botão hamburguer
    if (!nav.contains(event.target) && event.target !== hamburger) {
        // Se o menu estiver aberto, fecha-o
        if (nav.classList.contains("active")) {
            nav.classList.remove("active")
            document.body.classList.remove('menu-open')
        }
    }
}

// Função para ativar o link do menu ao clicar
function ativarLink(e) {
    // Remove a classe 'actived' de todos os links e adiciona ao link clicado
    links.forEach(link => link.classList.remove('actived'))
    e.target.classList.add('actived')
    lastActiveLink = e.target // Atualiza o último link ativo
}

// Função para ativar o link correspondente durante o scroll
function ativarLinkScroll() {
    // Obtém a posição atual do scroll com uma pequena folga
    let posicaoAtual = window.scrollY + 200

    // Itera sobre todas as seções da página
    sections.forEach(section => {
        let topoSecao = section.offsetTop // Obtém a posição superior da seção
        let idSecao = section.getAttribute('id') // Obtém o ID da seção

        // Verifica se a posição atual do scroll está dentro da seção
        if (posicaoAtual >= topoSecao && posicaoAtual <= topoSecao + section.offsetHeight) {
            // Remove a classe 'actived' de todos os links e adiciona ao link correspondente à seção visível
            links.forEach(link => link.classList.remove('actived'))
            let activeLink = document.querySelector(`header nav a[href="#${idSecao}"]`)
            activeLink.classList.add('actived')
            lastActiveLink = activeLink; // Atualiza o último link ativo
        }
    })
}

// Adiciona os event listeners
hamburger.addEventListener('click', toggleHamburgerMenu) // Alternar menu hamburguer ao clicar
document.addEventListener("click", closeMenuOnClickOutside) // Fechar menu ao clicar fora
links.forEach(link => link.addEventListener('click', ativarLink)) // Ativar link ao clicar
window.addEventListener('scroll', ativarLinkScroll) // Ativar link durante o scroll

// EXIBIR MODAL COM CERTIFICADO
// Seleciona elementos do DOM relacionados ao modal de certificados
let showModalButtonsCertificate = document.querySelectorAll(".show-modal-education") // Botões para exibir certificado
let closeModalButtonCertificate = document.querySelector(".close-modal-certificate") // Botão para fechar modal de certificado
let modalCertificate = document.querySelector(".details-modal-certificate") // Modal de certificado
let modalCertificateImg = document.querySelector(".modal-certificate-image") // Imagem do certificado no modal

// Função para abrir o modal e definir a imagem do certificado
function openModalCertificate(imgSrc) {
    modalCertificate.style.display = "block" // Exibe o modal
    modalCertificateImg.src = imgSrc // Define a imagem do certificado no modal
}

// Função para fechar o modal
function closeModalCertificate() {
    modalCertificate.style.display = "none" // Esconde o modal
}

// Adicionando evento de clique aos botões "Exibir Certificado"
showModalButtonsCertificate.forEach(function(button) {
    button.addEventListener("click", function() {
        let certificateImg = this.parentElement.parentElement.querySelector(".certificate-img") // Seleciona a imagem do certificado
        let imgSrc = certificateImg.src // Obtém o src da imagem
        openModalCertificate(imgSrc) // Abre o modal com a imagem do certificado
    })
})

modalCertificate.addEventListener("click", function(event) {
    // Fecha o modal se o clique ocorrer fora do conteúdo modal
    if (event.target === modalCertificate) {
        closeModalCertificate()
    }
})

// Adiciona um ouvinte de evento para a tecla 'Esc' para fechar o modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModalCertificate()
    }
})

// Adicionando evento de clique ao botão de fechar
closeModalButtonCertificate.addEventListener("click", closeModalCertificate) // Fecha o modal ao clicar no botão de fechar

// EXIBIR MODAL COM PROJETO
// Função para configurar detalhes de cartão
function setupCardDetails() {
    // Seleciona todos os botões com a classe '.show-modal-project'
    const showModalButtonsProject = document.querySelectorAll('.show-modal-project')
    // Seleciona o elemento do modal de projeto
    const modalProject = document.querySelector('.details-modal-project')
    // Seleciona o conteúdo do modal de projeto
    const modalContentProject = modalProject.querySelector('.details-content-project')

    // Função para fechar o modal
    function closeModal() {
        // Esconde o modal de detalhes
        modalProject.style.display = 'none'
        // Limpa o conteúdo do modal, mas mantém o botão de fechar
        modalContentProject.innerHTML = '<button class="close-btn-project">Fechar</button>'
    }

    // Itera sobre cada botão selecionado
    showModalButtonsProject.forEach((btn) => {
        // Adiciona um ouvinte de evento de clique para cada botão
        btn.addEventListener('click', () => {
            // Seleciona o conteúdo modal associado ao botão clicado
            const modalContent = btn.closest('.card-project-image').querySelector('.project-modal-content')

            // Limpa o conteúdo anterior do modal, exceto o botão de fechar
            modalContentProject.innerHTML = '<button class="close-btn-project">X</button>'

            // Clona o conteúdo do modal e adiciona ao contêiner
            const clonedModalContent = modalContent.cloneNode(true)
            modalContentProject.appendChild(clonedModalContent)

            // Exibe o modal de detalhes
            modalProject.style.display = 'flex'

            // Verifica o tamanho da tela e define o estilo de exibição do modal de acordo
            if (window.innerWidth < 768) {
                clonedModalContent.style.display = 'block' // Altera o estilo de exibição para 'block' para telas menores
            } else {
                clonedModalContent.style.display = 'flex' // Mantém o estilo de exibição como 'flex' para telas maiores
            }

            // Reatribui o evento de clique ao botão de fechar
            modalContentProject.querySelector('.close-btn-project').addEventListener('click', closeModal)

            // Adiciona um ouvinte de evento de clique no modal para fechá-lo quando clicar fora dele
            modalProject.addEventListener('click', (event) => {
                if (event.target === modalProject) {
                    closeModal()
                }
            })

            // Adiciona um ouvinte de evento para a tecla 'Esc' para fechar o modal
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeModal()
                }
            })
        })
    })
}


// Chama as funções de configuração
setupCardDetails() // Configura os detalhes dos cartões de projeto
setupIntersectionObserver() // Configura o observador de interseção
