
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import Slider from '../components/Slider'
import { db } from '../firebase'


export default function Home() {

  // offers
  const [offerListings, setOfferListings] = useState(null)
  
  // fetch offer listings 
  useEffect(()=>{
    async function fetchListings(){
      try {
        // ger reference
        const listingsRef = collection(db, "listings")
        // query or condition of the request
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
        // get the info or execute the query
        const querySnap = await getDocs(q)
        // save in variable
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setOfferListings(listings)
        // console.log(listings)
      
      } catch (error) {
        console.log(error);
        
      }

    }
    fetchListings()

  },[])

  // rent
  const [rentListings, setRentListings] = useState(null)
  
  // fetch offer listings 
  useEffect(()=>{
    async function fetchListings(){
      try {
        // ger reference
        const listingsRef = collection(db, "listings")
        // query or condition of the request
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));
        // get the info or execute the query
        const querySnap = await getDocs(q)
        // save in variable
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setRentListings(listings)
        // console.log(listings)
      
      } catch (error) {
        console.log(error);
        
      }

    }
    fetchListings()

  },[])

    // sale
    const [saleListings, setSaleListings] = useState(null)
  
    // fetch offer listings 
    useEffect(()=>{
      async function fetchListings(){
        try {
          // ger reference
          const listingsRef = collection(db, "listings")
          // query or condition of the request
          const q = query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4));
          // get the info or execute the query
          const querySnap = await getDocs(q)
          // save in variable
          const listings = []
          querySnap.forEach((doc)=>{
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setSaleListings(listings)
          // console.log(listings)
        
        } catch (error) {
          console.log(error);
          
        }
  
      }
      fetchListings()
  
    },[])


  return (
    <div>
      <Slider/>
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
            <Link to="/offers">
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offerListings.map((listing)=>(
                <ListingItem 
                  key={listing.id} 
                  listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Rent</h2>
            <Link to="/category/rent">
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for rent</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {rentListings.map((listing)=>(
                <ListingItem 
                  key={listing.id} 
                  listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Sale</h2>
            <Link to="/category/sale">
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for sale</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {saleListings.map((listing)=>(
                <ListingItem 
                  key={listing.id} 
                  listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
