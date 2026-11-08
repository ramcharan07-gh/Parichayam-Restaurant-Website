"use client";

import { MapPin, Phone, Clock, Navigation, CheckCircle, Users, UtensilsCrossed, ExternalLink } from "lucide-react";
import { useRestaurantInfo } from "@/lib/restaurant-info-store";

export function RestaurantLocation() {
  const { info } = useRestaurantInfo();

  return (
    <section className="rloc-section" id="location">
      <div className="rloc-container">
        {/* Section Heading */}
        <div className="rloc-header">
          <span className="pr-section-eyebrow">VISIT OR ORDER FROM US</span>
          <h2 className="rloc-title">Come Find Us in Angallu</h2>
          <p className="rloc-subtitle">
            Located conveniently near MITS College. Dine-in in our breezy garden, book our private party hall, or get food delivered hot to your doorstep.
          </p>
        </div>

        {/* Grid: Map + Details */}
        <div className="rloc-grid">
          {/* Map Column */}
          <div className="rloc-map-wrap">
            <iframe
              title="Parichayam Restaurant Location Map"
              src="https://maps.google.com/maps?q=13.6318002,78.4823367&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, borderRadius: 16 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="rloc-map-overlay-badge">
              <span className="rloc-badge-dot" />
              <span>Free Delivery within 3 km Radius</span>
            </div>
          </div>

          {/* Info Column */}
          <div className="rloc-info-card">
            <div className="rloc-info-item">
              <div className="rloc-icon-bubble"><MapPin size={22} /></div>
              <div>
                <strong className="rloc-info-label">Address</strong>
                <p className="rloc-info-val">{info.address}</p>
                <a
                  href={info.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rloc-direction-link"
                >
                  <Navigation size={14} /> Open in Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="rloc-info-item">
              <div className="rloc-icon-bubble"><Phone size={22} /></div>
              <div>
                <strong className="rloc-info-label">Direct Contact &amp; Enquiries</strong>
                <div className="rloc-phones">
                  <a href={`tel:${info.phone1}`} className="rloc-phone-link">
                    📞 {info.phone1}
                  </a>
                  {info.phone2 && (
                    <>
                      <span className="rloc-sep">•</span>
                      <a href={`tel:${info.phone2}`} className="rloc-phone-link">
                        📞 {info.phone2}
                      </a>
                    </>
                  )}
                </div>
                <p className="rloc-proprietor">Proprietor: <strong>{info.proprietor}</strong></p>
              </div>
            </div>

            <div className="rloc-info-item">
              <div className="rloc-icon-bubble"><Clock size={22} /></div>
              <div>
                <strong className="rloc-info-label">Opening Hours</strong>
                <p className="rloc-info-val">{info.hours}</p>
                <span className="rloc-status-pill"><CheckCircle size={13} /> Open Today for Lunch &amp; Dinner</span>
              </div>
            </div>

            {/* Poster Badges: Catering & Party Hall */}
            <div className="rloc-amenities-row">
              <div className="rloc-amenity">
                <UtensilsCrossed size={18} />
                <div>
                  <strong>{info.cateringAvailable}</strong>
                  <p>Bulk orders for college events &amp; parties</p>
                </div>
              </div>
              <div className="rloc-amenity">
                <Users size={18} />
                <div>
                  <strong>{info.partyHallCapacity}</strong>
                  <p>Private celebrations &amp; student get-togethers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
