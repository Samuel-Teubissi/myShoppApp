import { useEffect } from 'react'

const AboutPage = () => {
  useEffect(() => {
    document.title = 'A Propos | MyShop App'
  }, [])

  return (
    <>
      <div className="ms_Main"></div>
      <div className="pt-8 md:pt-10">
        <div className="max-w-7xl w-full md:w-4/5 sm:w-11/12 mx-auto px-3 bg-white mb-4 pt-4 dark:text-white/90 dark:bg-app-600/5">
          <div className="mt-4 py-6">
            <div className="about-detail w-full md:w-[90%] mx-auto space-y-4 pb-5">
              <div className="space-y-3">
                <h1>À propos de MyShop App</h1>
                <p>
                  <strong>MyShop App</strong> est une plateforme e-commerce
                  expérimentale créée dans le cadre d’un projet personnel. Elle
                  a pour but d’explorer et de tester le fonctionnement d’une
                  boutique en ligne moderne avec des fonctionnalités avancées.
                </p>
              </div>
              <div>
                <p className="title">Notre objectif :</p>
                <p className="content">
                  MyShop App n’est pas une boutique officielle mais un projet
                  d’apprentissage. Le but est de développer une solution
                  e-commerce complète permettant de présenter des produits,
                  gérer un panier et simuler des commandes en ligne.
                </p>
              </div>
              <div>
                <p className="title">Comment ça marche :</p>
                <p className="content">
                  Pour interagir avec la plateforme, les utilisateurs doivent
                  créer un compte. Cela leur permet de :
                  <br /> - Parcourir et consulter les produits.
                  <br /> - Ajouter des articles à leur panier.
                  <br /> - Simuler un processus de commande.
                </p>
              </div>
              <div>
                <p className="title">Un projet expérimental :</p>
                <p className="content">
                  Ce site n’a pas vocation à être une boutique en ligne
                  commerciale. Il s’agit d’un projet personnel pour tester des
                  fonctionnalités web et améliorer les compétences en
                  développement d’applications e-commerce.
                </p>
              </div>
              <div>
                <p className="title">Contact :</p>
                <p className="content">
                  Si vous souhaitez en savoir plus sur le projet ou partager des
                  suggestions :
                  <br />
                  <br /> - Envoyez moi un email à <br />
                  <b>📧 samtebs07@gmail.com</b>
                  <br /> - Laissez moi un message WhatsApp au <br />
                  📞{' '}
                  <b>
                    <a href="https://wa.me/237696771089">696 77 10 89</a>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default AboutPage
