import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'

export default function Category() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const params = useParams()

  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), limit(8))
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length -1]
        setLastFetchedListing(lastVisible)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        // console.log(listings)
        setLoading(false)
        
      } catch (error) {
        toast.error("Could not fetch listing")
        
      }

    }
    fetchListings()

  }, [params.categoryName])

  async function onFetchMoreListings(){
    try {
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), startAfter(lastFetchedListing), limit(4))
      const querySnap = await getDocs(q)
      const lastVisible = querySnap.docs[querySnap.docs.length -1]
      setLastFetchedListing(lastVisible)
      const listings = []
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings((prevState)=> [...prevState, ...listings])
      // console.log(listings)
      setLoading(false)
      
    } catch (error) {
      toast.error("Could not fetch listing")
      
    }


  }
  
  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold mb-6'> 
        {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
      </h1>

      {loading? (
        <Spinner/>
      ): listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {listings.map((listing)=>(
                <ListingItem kwy={listing.id} id={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className='flex justify-center items-center'>
              <button 
              className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'
              onClick={onFetchMoreListings}>Load more</button>
            </div>
          )}
        </>
      ): (
        <p> There are no current {params.categoryName === "rent" ? "places for rent" : "places for sale"}</p>
      )}
      
    </div>
  )
}
