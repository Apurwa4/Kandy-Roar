"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Crown, Users } from "lucide-react";

type Member = { name: string; role: string; image?: string };
type Group = { title: string; members: Member[] };

const portrait = (name: string, role: string): Member => ({ name, role, image: `/images/team/${name.toLowerCase()}.png` });
const eb: Group[] = [
  { title: "President", members: [{ name: "Lahiru Dinusha", role: "EB President", image: "/images/team/lahiru-dinusha.png" }] },
  { title: "Vice Presidents", members: [
    { name: "Shahnaas", role: "LCVP · BD", image: "/images/team/shahnaas.png" },
    { name: "Sayuni", role: "LCVP · EM", image: "/images/team/sayuni.png" },
    { name: "Pavithri", role: "LCVP · FnL", image: "/images/team/pavithri.png" },
    { name: "Shahla", role: "LCVP · iGT B2B & VD", image: "/images/team/shahla.png" },
    { name: "Binni", role: "LCVP · iGT M & IR" },
    { name: "Ihara", role: "LCVP · iGV B2B", image: "/images/team/ihara.png" },
    { name: "Inuri", role: "LCVP · iGV M & IR", image: "/images/team/inuri.png" },
    { name: "Nikila", role: "LCVP · iGV VD" },
    { name: "Thushanth", role: "LCVP · Marketing" },
    { name: "Zahra", role: "LCVP · oGTa", image: "/images/team/zahra.png" },
    { name: "Jayani", role: "LCVP · oGTe", image: "/images/team/jayani.png" },
    { name: "Devmi", role: "LCVP · oGV B2B & B2C", image: "/images/team/devmi.png" },
    { name: "Yethmini", role: "LCVP · oGV PS", image: "/images/team/yethmini.png" },
    { name: "Harindu", role: "LCVP · PR", image: "/images/team/harindu.png" },
    { name: "Fathima", role: "LCVP · TM", image: "/images/team/fathima.png" },
  ] },
];

const oc: Group[] = [
  { title: "Organizing Committee Presidents", members: [portrait("Ehaparan", "OC President"), portrait("Midhunesh", "OC President")] },
  { title: "Finance", members: [portrait("Apurwa", "OC Vice President · Finance")] },
  { title: "Delegate Experience", members: [portrait("Kavishka", "OC Vice President · Delegate Experience"), portrait("Roneth", "OC Member · Delegate Experience"), portrait("Vidunika", "OC Member · Delegate Experience"), portrait("Dilshini", "OC Member · Delegate Experience")] },
  { title: "Marketing", members: [portrait("Hansani", "OC Vice President · Marketing"), portrait("Hindujjah", "OC Vice President · Marketing"), portrait("Kavithanjali", "OC Member · Marketing"), portrait("Dinuja", "OC Member · Marketing")] },
  { title: "External Relations", members: [portrait("Nethmi", "OC Vice President · External Relations"), portrait("Sineka", "OC Vice President · External Relations"), portrait("Dilshan", "OC Member · External Relations"), portrait("Shakthi", "OC Member · External Relations"), portrait("Tanya", "OC Member · External Relations")] },
  { title: "Events & Logistics", members: [portrait("Kavinethere", "OC Vice President · Events & Logistics"), portrait("Isuru", "OC Vice President · Events & Logistics"), portrait("Umindu", "OC Member · Events & Logistics"), portrait("Avidu", "OC Member · Events & Logistics"), portrait("Rusdi", "OC Member · Events & Logistics")] },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="team-card group flex h-full w-full max-w-[250px] flex-col overflow-hidden rounded-t-[6rem] rounded-b-xl border border-[#d4af37]/30 text-center">
      <div className="team-portrait relative mx-3 mt-3 aspect-[4/5] overflow-hidden rounded-t-[5.5rem]">
        {!member.image ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#d4af37]/50" aria-label={`Portrait of ${member.name} coming soon`}>
            <Users className="h-16 w-16" strokeWidth={1} aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-widest">Portrait coming soon</span>
          </div>
        ) : (
          <Image src={member.image!} alt={member.name} fill sizes="(max-width: 480px) 44vw, 250px" className="object-contain object-bottom transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" />
        )}
      </div>
      <div className="relative min-h-28 flex-1 border-t border-[#d4af37]/25 bg-[#1c060d]/90 px-3 py-5">
        <h5 className="font-heading text-base font-bold text-[#f6eedb] sm:text-lg">{member.name}</h5>
        <p className="mt-2 text-[10px] font-medium uppercase leading-relaxed tracking-wider text-[#f1cf6b] sm:text-xs">{member.role}</p>
      </div>
    </article>
  );
}

export default function ConferenceTeam() {
  const [committee, setCommittee] = useState<"EB" | "OC">("EB");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section id="conference-team" aria-labelledby="team-heading" className="section-shell relative">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#3a0610] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#fae19c]"><Crown size={15} /> The Royal Council</span>
        <h2 id="team-heading" className="section-title mt-5">Conference <span className="gold-text">Team</span></h2>
        <p className="section-description mt-4 text-[#f6eedb]/75">The people bringing the kingdom to life. Meet the leaders and organizers behind Kandy Roar 7.0.</p>
      </div>
      <div role="tablist" aria-label="Conference committees" className="mx-auto mb-5 flex max-w-sm rounded-full border border-[#d4af37]/35 bg-[#23040a] p-1.5">
        {(["EB", "OC"] as const).map((tab, index) => (
          <button key={tab} ref={el => { tabs.current[index] = el; }} id={`team-tab-${tab}`} role="tab" aria-selected={committee === tab} aria-controls={`team-panel-${tab}`} tabIndex={committee === tab ? 0 : -1}
            onClick={() => setCommittee(tab)} onKeyDown={event => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
                setCommittee(next === 0 ? "EB" : "OC"); tabs.current[next]?.focus();
              }
            }} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fae19c] ${committee === tab ? "gold-btn" : "text-[#fae19c]/70 hover:text-[#fae19c]"}`}>
            {tab === "EB" ? <Crown size={16} /> : <Users size={16} />}{tab}
          </button>
        ))}
      </div>
      <div id={`team-panel-${committee}`} role="tabpanel" aria-labelledby={`team-tab-${committee}`} tabIndex={0} className="focus-visible:outline-[#d4af37]">
        <h3 className="text-center font-heading text-xl text-[#fae19c]">{committee === "EB" ? "Executive Board" : "Organizing Committee"}</h3>
        {(committee === "EB" ? eb : oc).map(group => (
          <div key={group.title} className="mt-12 sm:mt-16">
            <div className="mb-7 flex items-center justify-center gap-4 text-center">
              <span aria-hidden="true" className="h-px w-8 bg-[#d4af37]/40 sm:w-16" />
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f1cf6b] sm:text-sm">{group.title}</h4>
              <span aria-hidden="true" className="h-px w-8 bg-[#d4af37]/40 sm:w-16" />
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-7 sm:gap-x-6">
              {group.members.map(member => <div key={member.name} className="flex w-[calc(50%-0.5rem)] justify-center sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"><MemberCard member={member} /></div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
