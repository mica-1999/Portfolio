"use client";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { fetchDataFromApi } from '/src/utils/apiUtils';

export default function Footer() {
  const [rating, setRating] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;
    
    const fetchData = async () => {
      try {
          const response = await fetchDataFromApi(`/api/Rating/UserRating?userId=${session.user.id}`);
          setRating(response || 0);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
    fetchData();    
  }, [session]);

  const handleRating = async (index) => {
    setRating(index);

    try {
      const response = await fetch("/api/Rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          rating: index
        }),
    });

      const result = await response.json();
      if(result.error){
        console.error(result.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row d-flex mt-4">
      <div className="col-lg-12 d-flex justify-content-between align-items-center footer-links-section">
        <p className="mb-0">© 2025, made with ❤ by <a href="#" aria-label="Visit Micael Ribeiro's profile">Micael Ribeiro</a></p>
        <div className="rating d-flex flex-row-reverse">
          {[5,4,3,2,1].map((item, index) => (
              <i key={index} className={`ri-star-fill ${item <= rating ? "active": ''}`} onClick={() => handleRating(item)}></i>
          ))}
        </div>
        <div className="d-flex gap-3 footer-link">
          <a href="#">License</a>
          <a href="#">Themes</a>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  );
}