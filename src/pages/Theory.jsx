import React from "react";
import BackLink from "../components/layout/BackLink";
import Footer from "../components/layout/Footer";
import { routes } from "../routes";

export default function Theory() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 font-['Poppins',_sans-serif] selection:bg-neutral-100 selection:text-neutral-900">
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">

                {/* BACK NAVIGATION */}
                <BackLink to={routes.home}>Back to Home</BackLink>

                {/* HEADER */}
                <section className="pb-24 border-b border-neutral-800">
                    <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[1.05]">
                        THEORETICAL<br />
                        <span className="text-neutral-500">FRAMEWORK</span>
                    </h1>
                </section>

                {/* 01. INTRODUCTION */}
                <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
                    {/* Sticky Header Column */}
                    <div className="md:w-1/3 md:sticky md:top-24">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
                            01 / Overview
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                            Introduction.
                        </h2>
                    </div>


                    {/* Text Content Column */}
                    <div className="md:w-2/3 flex flex-col items-start space-y-6">
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Composing Atmospheres: The Transposition of Music to Architecture is conceived as an architectural experiment that seeks to explore the relationship between music and architecture, and the many ways in which these two disciplines can intersect, inform one another, and generate new forms of understanding. Although often approached separately, both music and architecture are fundamentally concerned with composition, rhythm, proportion, atmosphere, sequence, and emotional impact. One shapes space through matter; the other shapes time through sound.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Architecture, like music, is an art form. It does not simply provide shelter or function, but has the capacity to move, inspire, and influence human experience. In the same way that a musical composition can evoke tension, harmony, calm, or anticipation, architecture can produce emotional and perceptual responses through scale, light, materiality, rhythm, and spatial progression. This shared artistic language became the starting point of our workshop.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            The workshop is also part of the ongoing development of my doctoral research entitled “The Perception of the Architecture of Cultural Spaces – An Expression of the Civilization of the Moment.” Within this research, I aim to better understand human behavior through the lens of perception, particularly in relation to the multisensory experiences generated within cultural spaces.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Perception became our point of departure because it is the first layer through which architecture is received and interpreted. Before analysis, before language, before judgment, there is sensation. We considered emotion and state of mind to be the bridge between architecture and music: both disciplines have the power to shape mood, memory, atmosphere, and bodily response.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            From this premise, we developed a system of equivalence between architecture – emotion – music, understood as a reciprocal relationship. Spatial qualities may be translated into sound, while musical structures may suggest spatial experiences. Through this two-way process, the workshop invites participants to rethink architecture not only as something to be seen, but also as something to be heard, felt, and emotionally experienced.
                        </p>
                    </div>


                </section>

                {/* 02. DEFINING PERCEPTION */}
                <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
                    <div className="md:w-2/3 flex flex-col items-start space-y-6">
                        <h3 className="text-[11px] font-semibold text-neutral-300 uppercase tracking-[0.15em] mb-2 leading-relaxed">
                            Sensory Cognitive Processes and the Perception of Space in Architecture
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Sensory cognitive processes represent the first level of human knowledge, grounded in the information provided by the senses. They form the basis through which the mind begins to understand the surrounding world, offering data about the concrete qualities of objects and phenomena. Depending on how this information is received, processed, and integrated, three fundamental forms of sensory knowledge can be identified: sensation, perception, and mental representation.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Sensation is the immediate and direct response of the body to external stimuli. It reflects isolated physical properties such as color, sound, texture, or smell through the activation of sensory receptors and neural pathways. Although essential, sensation alone remains fragmentary and passive, providing raw data without deeper meaning.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Perception, by contrast, is the active cognitive process through which the brain organizes and interprets sensory input, transforming isolated sensations into coherent and meaningful experiences. Perception assigns context, function, and value to what we sense, and is shaped by memory, emotions, prior experiences, and expectations. Because of this, perception differs from one individual to another. Thinkers such as Jonathan Crary and Martin Jay challenged the idea of perception as purely visual, emphasizing the importance of the other senses in constructing our understanding of reality.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            In architecture, perception is the starting point of our relationship with space. What we see, hear, touch, or smell in a built environment strongly influences how we understand, use, and value it. Space is first encountered through its physical qualities—light, scale, texture, sound—and then interpreted through personal and cultural experience. Architecture therefore becomes more than a passive backdrop; it is a field of cognitive, emotional, and sensory interaction.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            For architects, understanding perception is essential. Designing space means designing experiences, and these experiences will always be interpreted differently depending on each user’s psychological and cultural background.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Perception also evolves over time. As we encounter new spaces, we build an internal archive of sensory and emotional references that helps us compare and interpret future environments. Our understanding of architecture becomes increasingly dynamic, shaped by memory, learning, and reflection.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Ultimately, perception is central to understanding architecture as a humanistic and multisensory practice. The way we perceive space determines how we experience it—and the way we experience it shapes how we will design it in the future.
                        </p>
                    </div>

                    <div className="md:w-1/3 md:sticky md:top-24">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
                            02 / Cognitive Framework
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                            Defining Perception <br />
                            <span className="text-neutral-500">as a Cognitive Process.</span>
                        </h2>
                    </div>

                </section>

                {/* 03. THE AUDITORY DIMENSION */}
                <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
                    <div className="md:w-2/3 flex flex-col items-start space-y-6">
                        <h3 className="text-[11px] font-semibold text-neutral-300 uppercase tracking-[0.15em] mb-2 leading-relaxed">
                            Auditory Stimuli and the Emotional Resonance of Architectural Form
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Beyond the visual and tactile, sound plays a fundamental role in the way space is perceived and experienced. It is one of the most subtle yet powerful ways through which architecture communicates. Reverberation, echo, silence, resonance, and the specific noises of a place all contribute to what may be understood as its sonic atmosphere—an invisible layer that deeply shapes the user’s experience.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Phenomenological thought helps us understand that architecture is not lived merely as form or volume, but as a multisensory experience in which sound is constantly present. Edmund Husserl emphasized the temporal nature of perception, and sound is perhaps the sense most directly connected to time. Maurice Merleau-Ponty argued that sound is not simply an external stimulus, but part of our embodied relation to the world. Juhani Pallasmaa, in The Eyes of the Skin, states that hearing “structures and unifies the experience of space”: while vision separates and frames, sound creates continuity, flow, and atmosphere.¹
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            This idea is especially relevant in cultural architecture. Many cultural spaces are designed to produce a distinct auditory experience. In a Gothic cathedral, the sound of voices or organ music is transformed by stone walls and vaulted ceilings into something immersive and transcendent. In modern concert halls such as the Berlin Philharmonie by Hans Scharoun, acoustics are carefully engineered so that architecture itself functions like a musical instrument. Form, geometry, and material become part of the composition.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Silence is equally important. In architecture, silence is not the absence of sound, but a designed condition of presence, concentration, and introspection. Libraries, memorials, museums, and sacred spaces often rely on silence as an atmospheric material, as meaningful as light, concrete, or stone.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            Sound also has a unique relationship with memory and emotion. The ringing of a church bell, footsteps on stone pavement, the rustling of leaves in a courtyard—these become sonic signatures of place. They contribute to identity and cultural memory in ways that drawings or photographs cannot fully capture.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            For this reason, sound was chosen as the medium through which to translate architecture in this workshop. Sound has the capacity to express rhythm, scale, density, openness, tension, calm, and movement in an immediate and emotional way. It can reveal the personality of a space not only through technical acoustics, but through atmosphere and perception.
                        </p>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                            By translating architecture into sound, we are not simplifying space—we are uncovering another language through which architecture can be understood, remembered, and felt.
                        </p>
                    </div>
                    <div className="md:w-1/3 md:sticky md:top-24">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
                            03 / Sonic Atmosphere
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                            The Auditory Dimension <br />
                            <span className="text-neutral-500">of Architecture.</span>
                        </h2>
                    </div>

                </section>

                {/* MINIMAL FOOTER */}
                <Footer />

            </div>
        </main>
    );
}
