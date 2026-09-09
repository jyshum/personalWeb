import type { Metadata } from "next"
import ProjectPage from "../components/ProjectPage"

export const metadata: Metadata = {
  title: "SickNote — Jared Shum",
  description:
    "A binary cough classifier: a 3-model CNN ensemble trained on 2,267 expert-labeled clips, served via FastAPI.",
}

export default function SickNote() {
  return (
    <ProjectPage
      title="SickNote"
      titleHref="https://www.sicknoteinc.xyz/"
      backHref="/projects"
      backLabel="Back to projects"
      meta="Machine learning project · 3rd place, XdHacks Vancouver"
      shot={{
        src: "/sicknote-shot.png",
        alt: "The SickNote web app",
        width: 1440,
        height: 900,
        caption: "sicknoteinc.xyz",
      }}
      codeHref="https://github.com/jyshum/SickNote"
      reflection={
        <>
          <p>
            One of my first machine learning projects. The first one I placed with at a hackathon.
            It&apos;s also where computer vision stopped being something I read about and became
            something I wanted to build. I&apos;ve been leaning further into it ever since.
          </p>
        </>
      }
    >
      <p>
        SickNote takes a cough recording, turns it into a mel spectrogram, and predicts whether
        the cough is a sick one. A 3-model, 3-layer CNN ensemble, trained from scratch on 2,267
        expert-labeled clips.
      </p>
      <p>
        The number I care about is not the one that looks best. An earlier version of this model
        reported 0.73 AUC. Nested 5-fold cross-validation showed that figure was split noise, an
        artifact of which clips happened to land in which fold, not a property of the model. The
        honest number, measured on held-out test data, is 0.724 AUC-ROC.
      </p>
      <p>
        I tried ResNet18 transfer learning first. It overfit badly on a dataset this small, so I
        reverted to the from-scratch CNN. Then I replaced a 1.4-million-parameter dense head with
        time-axis pooling: the same 0.724 AUC-ROC, at 72 thousand parameters. Roughly twenty times
        smaller for no loss in performance.
      </p>
      <p>
        Predictions are served from FastAPI, trained with BCEWithLogitsLoss and a positive-class
        weight to handle the class imbalance. The model runs on Railway, the frontend on Vercel.
      </p>
    </ProjectPage>
  )
}
