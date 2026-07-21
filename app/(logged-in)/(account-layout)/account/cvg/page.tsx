import React from 'react';
import Link from 'next/link';
import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from '@/features/landing/section-layout';

const CvgPage = () => {
  return (
    <> 
      <SectionLayout size="lg" variant="default" className="mx-auto mt-[-20px] py-0 lg:py-0">
        {/* Header */}
        <header>
          <Typography variant="h1" className="mb-2 text-2xl font-bold md:text-3xl">
            Conditions Générales de Vente
          </Typography>
          <Typography variant="h2" className="text-xl font-medium text-gray-700">
            Vente en ligne – Services à distance
          </Typography>
        </header>

        <hr className="my-6" />

        {/* Introduction */}
        <section className="mb-8">
          <Typography variant="p" className="mb-4">
            Bienvenue et merci pour votre confiance. Vous trouverez ci-après les Conditions Générales de Vente applicables aux programmes Unlcoaching.
            Veuillez noter que Coach Jeremy Prat met à la disposition de ses Clients et des Utilisateurs de son site un service client qui peut être contacté
            selon les modalités suivantes :
          </Typography>

          <ul className="ml-6 list-disc space-y-2">
            <li>
              <Typography variant="p">
                Par téléphone : au +33646230279 (prix d'un appel local), de 9 heures à 20 heures du lundi au vendredi, heure de Paris.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                Par email à l'adresse :{' '}
                <Link
                  href="mailto:contact@unlcoaching.com"
                  className="text-orange-500 hover:underline"
                >
                  contact@unlcoaching.com
                </Link>
              </Typography>
            </li>
          </ul>
        </section>

        <hr className="my-6" />

        {/* Définitions */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            DÉFINITIONS
          </Typography>
          <Typography variant="p" className="mb-4">
            Les termes assortis d'une majuscule renvoient aux définitions suivantes :
          </Typography>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <Typography variant="p">
                <strong>La « Société » </strong>
                désigne Coach Jeremy Prat, représentée par jeremy Prat, en sa qualité de chef d'entreprise, dont le siège social est situé à 239 AVENUE PASTEUR , 33600 PESSAC France.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Le « Site » </strong>
                désigne le(s) site(s) internet accessible(s) à partir du lien URL :{' '}
                <Link
                  href="https://unlcoaching.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  https://unlcoaching.com
                </Link>
                ; et l'ensemble des sites édités par la Société pour présenter et vendre ses Services.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>L'« Utilisateur » </strong>
                désigne toute personne naviguant sur le Site.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Le « Service » </strong>
                désigne toutes les prestations de services disponibles à la Commande sur le Site, et notamment les Services de :
              </Typography>
              <ul className="ml-6 mt-2 list-disc space-y-2">
                <li>Conférence en ligne de type webinaire (retransmission, ou inscription à un événement en direct)[Pas encore en service]</li>
                <li>Formations en ligne (fourniture de contenu numérique sous forme de documents, vidéos, podcasts, ebooks, supports PowerPoint, etc.) constituant les supports de formations[Pas encore en service]</li>
                <li>Documents téléchargeables de type ebook</li>
                <li>Accompagnement personnalisé de type coaching, à distance ou en présentiel</li>
                <li>Programmes d'entrainements personnalisés</li>
                <li>Accès à l'application Unlcoaching</li>
              </ul>
            </li>
            <li>
              <Typography variant="p">
                <strong>La « Commande » </strong>
                désigne toute souscription d'un Service par le Client auprès de la Société via le Site.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Le « Client » </strong>
                désigne la personne physique ou morale, professionnelle ou non, souscrivant un Service auprès de la Société.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Les « Conditions Générales de Vente » ou « CGV » </strong>
                désignent les présentes conditions générales de vente, applicables dans le cadre de la relation contractuelle entre la Société 
                et ses Clients, qui comprennent la politique de confidentialité éventuellement disponible sur le Site et tout élément du Site 
                auquel elles renvoient expressément.
              </Typography>
            </li>
          </ul>
        </section>

        <hr className="my-6" />

        {/* Durée du Service */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            DURÉE DU SERVICE
          </Typography>
          <Typography variant="p" className="mb-4">
            Le Service est fourni au Client pendant la durée spécifiée sur le Site au moment de la Commande. Dans le cadre de l'offre de contenus numériques
            ou services numériques, le Client est expressément informé que le bénéfice de certaines promotions est conditionné à une durée minimale d'engagement,
            qui lui sera précisée au moment de sa Commande.
          </Typography>
          <Typography variant="p" className="mb-4">
            Lorsqu'aucune durée n'est définie, le Service reste accessible pendant au moins six mois après la délivrance complète du Service, et la Société pourra
            retirer les accès à tout moment par la suite. En cas d'achat d'une formation en ligne ou d'une offre d'accès à du contenu numérique, des supports sont
            fournis en version PDF, audio ou vidéo qu'il appartient au Client de télécharger dans leur dernière version avant l'expiration de ses droits d'accès.
          </Typography>
        </section>

        <hr className="my-6" />

        {/* Abonnements */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            ABONNEMENTS
          </Typography>
          <Typography variant="p" className="mb-4">
            <strong>Abonnement avec période d'engagement.</strong> L'abonnement est souscrit par le Client pour une durée minimale de 1 mois ou 3 mois. La validation
            de la Commande emporte un engagement ferme et irrévocable de régler le prix total du Service pour la durée initiale d'abonnement prévue.
          </Typography>
        </section>

        <hr className="my-6" />

        {/* Commande */}
        <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
      COMMANDE
    </Typography>
    <ul className="ml-6 list-disc space-y-4">
      <li>
        <Typography variant="p">
          <strong>Commande sur le Site.</strong>{" "}
          <p className="mt-2">
            Le client suit un processus en plusieurs étapes. Une fois le service choisi, il accède à une page dédiée où il doit :
          </p>
          <ul className="ml-6 mt-2 list-disc">
            <li>Fournir ses coordonnées personnelles</li>
            <li>Sélectionner son mode de paiement (paiement intégral ou échelonné)</li>
          </ul>
          <p className="mt-2">
            Il est important de noter que le client est entièrement responsable des 
            informations fournies. Il doit notamment s'assurer de disposer d'une 
            adresse email valide, celle-ci étant nécessaire pour :
          </p>
          <ul className="ml-6 mt-2 list-disc">
            <li>Recevoir la confirmation de commande</li>
          </ul>
          <p className="mt-2">
            Concernant les données personnelles (âge, poids, taille), celles-ci sont uniquement collectées dans le but d'élaborer un plan alimentaire 
            personnalisé. Aucune autre utilisation n'en sera faite.
          </p>
          <p className="mt-2">
            La société se dégage de toute responsabilité en cas d'utilisation d'une fausse identité par le client.
          </p>
        </Typography>
      </li>
      <li>
        <Typography variant="p">
          <strong>Obligation de paiement.</strong>{" "}
          Toute Commande reçue par la Société est réputée ferme et définitive, 
          entraînant l'adhésion et l'acceptation pleine et entière des CGV, ainsi 
          que l'obligation de paiement de tout Service commandé.
        </Typography>
      </li>
      <li>
        <Typography variant="p">
          <strong>Signature électronique.</strong>{" "}
          La fourniture en ligne des coordonnées bancaires et la validation finale 
          de la Commande valent preuve de l'accord du Client, de l'exigibilité des 
          sommes dues, ainsi que de la signature et de l'acceptation expresse de 
          toutes les opérations effectuées lors de la Commande sur le Site.
        </Typography>
              <Typography variant="p">
                <strong>Validation de la Commande.</strong> Après avoir lu et accepté les CGV sur la page de Commande, le Client est redirigé
                vers une page récapitulative où il fournit ses coordonnées bancaires avant de valider son paiement.
              </Typography>
            </li>
          </ul>
        </section>

        <hr className="my-6" />

        {/* Conditions Tarifaires */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            CONDITIONS TARIFAIRES
          </Typography>
          <ul className="ml-6 list-disc space-y-4">
            <li>
              <Typography variant="p">
                <strong>Tarifs applicables.</strong> Le Service est délivré aux tarifs en vigueur figurant sur le Site lors de l'enregistrement de la Commande.
                Les prix sont indiqués en euros et incluent la TVA applicable au jour de la Commande.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Exigibilité des sommes.</strong> La validation de la Commande rend exigibles toutes les sommes dues. En validant sa Commande, le Client
                autorise la Société (ou ses partenaires, prestataires de services de paiement) à envoyer des instructions à sa banque pour débiter son compte.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Mode de paiement.</strong> Pour régler sa Commande, le Client dispose de l'ensemble des modes de paiement proposés sur le Site. Le paiement 
                s'effectue par prélèvement STRIPE ou via les informations de carte bancaire communiquées.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Facilités de paiement.</strong> Si la Société propose un règlement échelonné d'un prix forfaitaire, il ne s'agit pas d'un paiement sans
                engagement ou d'un abonnement mensualisé, mais d'un échéancier. La totalité du prix correspondant à la somme des paiements échelonnés reste due.
              </Typography>
            </li>
          </ul>
        </section>

        <hr className="my-6" />

        {/* Droit de Rétractation */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            DROIT DE RÉTRACTATION
          </Typography>
          <ul className="ml-6 list-disc space-y-4">
            <li>
              <Typography variant="p">
                <strong>Délai.</strong> Le Client peut se rétracter du contrat conclu avec la Société sans donner de motif dans un délai de quatorze jours
                calendaires commençant le jour suivant la Commande. Si le délai expire un samedi, un dimanche ou un jour férié, il est prorogé jusqu'à l'expiration
                de la dernière heure du premier jour ouvrable suivant.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Exercice.</strong> Pour exercer le droit de rétractation, le Client notifie à contact@team-ricco.com, sa décision de rétractation du présent
                contrat au moyen d'une déclaration dénuée d'ambiguïté. En cas de rétractation, la Société rembourse le prix réglé au plus tard quatorze jours à compter
                du jour après réception de la décision de rétractation.
              </Typography>
            </li>
          </ul>

          {/* Modèle de formulaire de rétractation */}
          <div className="mt-6 rounded-lg p-6">
            <Typography variant="h3" className="mb-4 text-xl font-semibold">
              MODÈLE DE FORMULAIRE DE RÉTRACTATION
            </Typography>
            <Typography variant="p" className="mb-4">
              Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.
            </Typography>
            <Typography variant="p" className="mb-4">
              A l'attention de Coach Jérémy Prat, basé à 239 AVENUE PASTEUR , 33600 PESSAC France, joignable au +33646230279 ou par email à l'adresse contact@unlcoaching.com :
            </Typography>
            <div className="space-y-2">
              <Typography variant="p">Je/nous (_) vous notifie/notifions (_) par la présente ma/notre (_) rétractation du contrat portant pour la prestation de services (_) ci-dessous :</Typography>
              <Typography variant="p">Commandé le (_) :</Typography>
              <Typography variant="p">Nom du (des) consommateur(s) :</Typography>
              <Typography variant="p">Adresse du (des) consommateur(s) :</Typography>
              <Typography variant="p">Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier) :</Typography>
              <Typography variant="p">Date:</Typography>
              <Typography variant="p" className="italic">(_) Rayez la mention inutile.</Typography>
            </div>
          </div>

          {/* Exceptions au droit de rétractation */}
          <div className="mt-6">
            <Typography variant="p" className="mb-4 font-semibold">
              ATTENTION, CE DROIT DE RÉTRACTATION NE POURRA PAS ÊTRE EXERCÉ SOUS CERTAINES CONDITIONS EN CAS DE :
            </Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="p">
                  Fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du
                  consommateur et renoncement exprès à son droit de rétractation
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  Fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après l'accord préalable exprès du consommateur
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  Fourniture d'enregistrements audio ou vidéo ou de logiciels informatiques lorsqu'ils ont été descellés par le consommateur après la livraison
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  Lorsque le Client est un professionnel ou lorsque le contrat a été conclu dans une finalité professionnelle
                </Typography>
              </li>
            </ul>
          </div>
        </section>

        <hr className="my-6" />

        {/* Conditions d'Accès */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            CONDITIONS D'ACCÈS AU SITE ET AU SERVICE
          </Typography>
          <ul className="ml-6 list-disc space-y-4">
            <li>
              <Typography variant="p">
                <strong>Accès au Site.</strong> Le Site est accessible gratuitement à toute personne disposant d'un accès à Internet. 
                Tous les coûts afférents à l'accès au Site sont exclusivement à la charge de l'Utilisateur. La Société ne pourra être 
                tenue responsable de dommages matériels liés à l'utilisation du Site.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Accès au Service.</strong> La Société fournira les liens pour que l'utilisateur puisse crée son compte avec ces identifiants lui permettant d'accéder
                au Service au plus tard dans un délai de 24 heures à compter de la Commande, sous réserve de l'acceptation du paiement par la banque du Client.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Caractère individuel et personnel des Identifiants.</strong> Tout Identifiant de connexion fourni par la Société au Client est strictement personnel,
                individuel, confidentiel et intransmissible. Le Client s'engage à ne souscrire au Service qu'à des fins exclusivement personnelles.
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                <strong>Maintenance.</strong> Le Site peut faire l'objet d'opérations de maintenance et la Société se réserve la possibilité d'interrompre, de suspendre
                momentanément ou de modifier sans préavis l'accès à tout ou partie du Site ou du Service.
              </Typography>
            </li>
          </ul>
        </section>

        <hr className="my-6" />

        {/* Garantie Légale */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            GARANTIE LÉGALE
          </Typography>
          <Typography variant="p" className="mb-4 font-semibold">
            LE CLIENT EST EXPRESSÉMENT INFORMÉ QUE CETTE GARANTIE NE S'APPLIQUE PAS AUX CLIENTS PROFESSIONNELS ET AUX SERVICES AUTRES QUE LES SERVICES NUMÉRIQUES,
            QUE LE PROFESSIONNEL UTILISE OU NON DES FORMATS OU DES MOYENS NUMÉRIQUES POUR CRÉER LE PRODUIT DU SERVICE, LE FOURNIR OU LE TRANSMETTRE AU CONSOMMATEUR.
          </Typography>

          <div className="space-y-4">
            <Typography variant="p">
              Le consommateur dispose d'un délai de deux ans à compter de la fourniture du contenu numérique ou du service numérique pour obtenir la mise en œuvre
              de la garantie légale de conformité en cas d'apparition d'un défaut de conformité. Durant un délai d'un an à compter de la date de fourniture, le consommateur
              n'est tenu d'établir que l'existence du défaut de conformité et non la date d'apparition de celui-ci.
            </Typography>

            <Typography variant="p">
              La garantie légale de conformité emporte obligation de fournir toutes les mises à jour nécessaires au maintien de la conformité du contenu numérique
              ou du service numérique.
            </Typography>

            <Typography variant="p">
              La garantie légale de conformité donne au consommateur droit à la mise en conformité du contenu numérique ou du service numérique sans retard injustifié 
              suivant sa demande, sans frais et sans inconvénient majeur pour lui.
            </Typography>

            <Typography variant="p">
              Le consommateur peut obtenir une réduction du prix en conservant le contenu numérique ou le service numérique ou il peut mettre fin au contrat
              en se faisant rembourser intégralement contre renoncement au contenu numérique ou au service numérique, si :
            </Typography>

            <ul className="ml-6 list-decimal space-y-2">
              <li>
                <Typography variant="p">
                  Le professionnel refuse de mettre le contenu numérique ou le service numérique en conformité
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  La mise en conformité du contenu numérique ou du service numérique est retardée de manière injustifiée
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  La mise en conformité du contenu numérique ou du service numérique ne peut intervenir sans frais imposés au consommateur
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  La mise en conformité du contenu numérique ou du service numérique occasionne un inconvénient majeur pour le consommateur
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  La non-conformité du contenu numérique ou du service numérique persiste en dépit de la tentative de mise en conformité du professionnel restée infructueuse
                </Typography>
              </li>
            </ul>
          </div>
        </section>

        <hr className="my-6" />

        {/* Protection des Données Personnelles */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            PROTECTION DES DONNÉES PERSONNELLES
          </Typography>

          <div className="space-y-4">
            <Typography variant="p">
              La Société respecte la vie privée de ses Utilisateurs et Clients. Elle s'engage à ce que la collecte et le traitement automatisé de leurs données – ayant pour finalité la gestion des contrats et des Commandes, la fourniture et l'amélioration du Site et du Service, la prospection commerciale et le traitement des litiges – soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés dans sa dernière version.
            </Typography>

            <Typography variant="p">
              Afin de fournir le service ou certains contenus numériques, la Société est amenée à collecter et traiter les données suivantes concernant le Client : nom, prénom, adresse email, numéro de téléphone, adresse de facturation, coordonnées bancaires, profession.
            </Typography>

            <Typography variant="p">
              Les données à caractère personnel des Clients ne seront pas conservées au-delà de la durée strictement nécessaire à la poursuite des finalités indiquées. Certaines données permettant d'établir la preuve d'un droit ou d'un contrat, peuvent faire l'objet d'une politique d'archivage intermédiaire pour une durée correspondant aux délais de prescription et forclusion des actions judiciaires ou administratives susceptibles de survenir.
            </Typography>

            <Typography variant="p">
              Conformément à la loi Informatique et libertés et au RGPD, le Client ou toute personne concernée par le traitement dispose, selon les conditions du droit applicable, d'un droit d'accès, de rectification, à la limitation du traitement, d'opposition au traitement, à la portabilité, d'effacement ainsi qu'un droit de ne pas faire l'objet d'une décision automatisée y compris un profilage. Le cas échéant, la personne concernée dispose également du droit de retirer son consentement à tout moment.
            </Typography>

            <Typography variant="p">
              Toute demande d'exercice peut être adressée par email à l'adresse contact@unlcoaching.com Toute personne concernée par un traitement dispose d'un droit de réclamation auprès de la Commission Nationale Informatique et Libertés.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Sites Partenaires - Liens Hypertexte */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            SITES PARTENAIRES – LIENS HYPERTEXTE
          </Typography>
          <div className="space-y-4">
            <Typography variant="p">
              L'Utilisateur peut accéder, par les liens hypertexte présents sur le Site ou dans le cadre d'un Service, aux sites de Partenaires ou de tiers, conçus et gérés sous la responsabilité de tiers qui ne sont pas soumis aux CGV. L'Utilisateur est, en conséquence, invité à prendre connaissance des conditions contractuelles d'utilisation ou de vente ainsi que des politiques de confidentialité ou toutes autres informations légales, applicables à ces sites Partenaires ou tiers.
            </Typography>

            <Typography variant="p">
              Aucun contrôle sur lesdits sites et contenus n'est exercé de la part de la Société qui décline toute responsabilité s'agissant de leur contenu et de l'utilisation faite par tout tiers des informations y figurant. Cette clause s'applique à tout contenu des Partenaires.
            </Typography>

            <Typography variant="p">
              Si un site tiers dirige ses utilisateurs vers le Site, la Société se réserve la possibilité de demander la suppression du lien hypertexte pointant vers le Site si elle estime que ce lien n'est pas conforme à ses droits et intérêts légitimes.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Cas de Force Majeure */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            CAS DE FORCE MAJEURE OU D'IMPOSSIBILITÉ
          </Typography>
          <div className="space-y-4">
            <Typography variant="p">
              L'exécution des obligations de la Société aux termes des présentes est suspendue en cas de survenance d'un cas fortuit ou de force majeure qui en empêcherait l'exécution. Cette suspension peut concerner tout ou partie du Service. Dans ce cas, la Société avisera le Client de la survenance d'un tel évènement dès que possible et de la durée estimée de la suspension. Seul un empêchement définitif pourra donner lieu à restitution. Si l'empêchement définitif est partiel, seule une restitution partielle sera accordée.
            </Typography>

            <Typography variant="p">
              Dans les conditions prévues par la loi, les Clients acceptent expressément qu'ils ne pourront invoquer un cas de force majeure pour repousser un paiement (d'une facture par exemple) pour un Service fourni ou en cours de fourniture, ou refuser la livraison d'une Commande passée.
            </Typography>

            <Typography variant="p">
              Sont considérés comme cas de force majeure ou cas fortuit, outre ceux habituellement reconnus par la jurisprudence des cours et tribunaux et sans que cette liste ne soit restrictive : les grèves ou conflits sociaux internes ou externes à la Société, les désastres naturels, les incendies, l'interruption des télécommunications, les épidémies et pandémies, l'interruption de l'approvisionnement en énergie, interruption des communications ou des transports de tout type ou toute autre circonstance échappant au contrôle raisonnable de la Société.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Propriété Intellectuelle */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            PROPRIÉTÉ INTELLECTUELLE
          </Typography>
          <div className="space-y-4">
            <Typography variant="p">
              La Société ou ses Partenaires sont titulaires de tous les droits de propriété intellectuelle relatifs au Site et au Service. Les droits de propriété intellectuelle portent notamment mais pas exclusivement sur tous les contenus, textes, images, vidéos, graphismes, logos, icônes, sons, logiciels figurant sur le Site ou constituant les outils et les supports délivrés sur le Site et dans le cadre du Service.
            </Typography>

            <Typography variant="p">
              L'accès au Site et au Service ne confère aucun droit à l'Utilisateur ou au Client sur les droits de propriété intellectuelle relatifs au Site et au Service, qui restent la propriété exclusive de la Société ou de ses Partenaires.
            </Typography>

            <Typography variant="p">
              En contrepartie du paiement du prix demandé lors de la Commande, les contenus, techniques, savoir-faire et méthodes transmis et, plus généralement, toutes les informations du Service font l'objet d'un droit d'utilisation strictement personnel, non cessible et non exclusif pour la durée du Service sélectionné par le Client au moment de la Commande pendant la durée du contrat uniquement.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Références et Communication */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            RÉFÉRENCES ET COMMUNICATION
          </Typography>
          <div className="space-y-4">
            <Typography variant="h3" className="mb-2 text-xl font-medium">
              Référence-Client
            </Typography>
            <Typography variant="p">
              Les Clients pourront être sollicités par la Société afin d'être cités comme bénéficiaires du Service. Avec l'accord du Client, la Société pourra être autorisée à mentionner le nom du Client, l'avis qu'il a donné à la Société sur le Service ainsi qu'une description objective de la nature du Service qui lui a été fourni dans ses listes de références et propositions à l'attention de ses prospects et de sa Clientèle notamment sur le Site, à des fins publicitaires et promotionnelles.
            </Typography>

            <Typography variant="h3" className="mb-2 text-xl font-medium">
              Autorisation d'exploitation
            </Typography>
            <Typography variant="p">
              Lorsque le Client adresse des écrits, des vidéos et/ou photographies à la Société pour donner son avis ou témoigner sur le Service fourni par la Société, et le cas échéant émet des commentaires ou publications concernant la Société, alors le Client autorise la Société à exploiter ces contenus pour la promotion de ses activités commerciales.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Evolution des Conditions Générales */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            EVOLUTION DES CONDITIONS GÉNÉRALES
          </Typography>
          <div className="space-y-4">
            <Typography variant="p">
              La Société se réserve le droit de modifier les termes, conditions et mentions des CGV à tout moment et sans préavis afin de les adapter aux évolutions du Site ou de son exploitation, et des caractéristiques du Service. Les conditions applicables sont celles acceptées par le Client et adressées au Client en cas de vente à distance par tout moyen de communication sur un support durable.
            </Typography>

            <Typography variant="p">
              Les modifications des CGV apportées par la Société ne s'appliqueront pas aux Services déjà souscrits, sauf pour les clauses liées à l'évolution technique du Service, dès lors qu'il n'en résulte ni augmentation de prix, ni altération de la qualité ou des caractéristiques auxquelles le Client non-professionnel ou consommateur a subordonné son engagement.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Garantie */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            GARANTIE
          </Typography>
          <div className="space-y-4">
            <Typography variant="p">
              Sauf dans les conditions des garanties légales ou commerciales consenties éventuellement applicables, la Société n'est tenue à aucune obligation de résultat et ne fournit aucune garantie expresse ou implicite, et ce y compris, sans que cette énumération ne soit limitative, relative à la continuité, à la performance, au résultat, à la pérennité du Service fourni, qui sont soumis à un aléa.
            </Typography>

            <Typography variant="p">
              Le prix du Service ne comprend en aucun cas les frais à engager par le Client dans le cadre de ses activités pour atteindre ses objectifs et tout montant de frais, par exemple de publicité, est toujours fourni à titre purement indicatif dans le cadre du Service.
            </Typography>

            <Typography variant="p">
              Les éventuels objectifs, témoignages de réussite ou exemples présentés par la Société sur le Site et dans le cadre du Service supposent la mise en œuvre concrète et effective de l'ensemble des conseils, techniques et outils éventuellement fournis dans le cadre du Service et ne constituent en aucun cas une promesse de gain ou de résultat.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Responsabilité */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            RESPONSABILITÉ
          </Typography>
          <div className="space-y-4">
            <Typography variant="h3" className="mb-2 text-xl font-medium">
              Responsabilité des Utilisateurs et Clients
            </Typography>
            <Typography variant="p">
              L'Utilisateur ou le Client est seul responsable des interprétations qu'il fait des informations fournies au titre des Services, des conseils qu'il déduit ou qui lui ont été fournis dans le cadre des Services et des adaptations réalisées pour ses activités propres. L'exploitation des informations se fait sous la seule responsabilité du Client et à ses risques et périls, ce que le Client accepte expressément.
            </Typography>

            <Typography variant="p">
              Le Client reconnaît qu'il a bénéficié d'informations et de conseils suffisants avant de s'engager et a conscience que tout résultat recherché comporte, par nature, des risques et demande des efforts conséquents.
            </Typography>

            <Typography variant="h3" className="mb-2 mt-4 text-xl font-medium">
              Limitation de responsabilité
            </Typography>
            <Typography variant="p">
              Quel que soit le type de formule du Service sélectionné par le Client professionnel, la responsabilité de la Société est expressément limitée à l'indemnisation des dommages directs prouvés par le Client professionnel. En aucun cas, la responsabilité de la Société ne saurait être engagée au titre des dommages indirects.
            </Typography>

            <Typography variant="p" className="font-medium">
              EN TOUT ÉTAT DE CAUSE, LA RESPONSABILITÉ DE LA SOCIÉTÉ EST PLAFONNÉE À L'ÉGARD DES PROFESSIONNELS AU MONTANT DU PRIX PAYÉ HORS TAXES PAR LE CLIENT EN CONTREPARTIE DE LA FOURNITURE DU SERVICE DANS LE CADRE DUQUEL S'INSCRIT LE LITIGE.
            </Typography>
          </div>
        </section>

        <hr className="my-6" />

        {/* Litiges */}
        <section className="mb-8">
          <Typography variant="h2" className="mb-4 text-2xl font-semibold">
            LITIGES
          </Typography>
          <div className="space-y-4">
            <Typography variant="h3" className="mb-2 text-xl font-medium">
              Résolution amiable
            </Typography>
            <Typography variant="p">
              En cas de litige, le Client s'adressera en priorité à la Société pour tenter de trouver une solution amiable.
            </Typography>

            <Typography variant="h3" className="mb-2 text-xl font-medium">
              Médiation
            </Typography>
            <Typography variant="p">
              En cas de difficulté dans l'application du présent contrat, le Client consommateur résidant en Europe a la possibilité, avant toute action en justice, de solliciter le recours d'un médiateur de la consommation identifiable sur le site{' '}
              <Link href="https://www.economie.gouv.fr/mediation-conso" className="text-orange-500 hover:underline">
                https://www.economie.gouv.fr/mediation-conso
              </Link>
            </Typography>

            <Typography variant="h3" className="mb-2 text-xl font-medium">
              Litige entre professionnels
            </Typography>
            <Typography variant="p" className="font-medium">
              EN CAS DE LITIGE SURVENANT ENTRE UN CLIENT PROFESSIONNEL ET LA SOCIÉTÉ, IL EST ATTRIBUÉ COMPÉTENCE EXCLUSIVE AUX TRIBUNAUX DANS LE RESSORT DE LA VILLE DU SIÈGE DE LA SOCIÉTÉ.
            </Typography>
          </div>
        </section>
        </SectionLayout>
    </>
  );
};

export default CvgPage;
