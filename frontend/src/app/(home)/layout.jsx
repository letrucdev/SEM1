"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function HomeLayout({ children }) {
  const pathName = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      <header className="flex justify-between items-center border-b bg-gray-100 px-6 py-4">
        {/* Navigation Links */}
        <svg
          width="150"
          height="44"
          viewBox="0 0 150 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:cursor-pointer"
          href="/home"
        >
          <g filter="url(#filter0_ii_1_24)">
            <g clip-path="url(#clip0_1_24)">
              <rect y="2.5" width="39" height="39" rx="10" fill="#2563EB" />
              <g filter="url(#filter1_di_1_24)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.381 11.5915C20.7862 12.2522 18.4846 12.2522 16.8899 11.5915C15.5942 11.0546 14.1448 11.0048 12.8075 11.5674C9.98543 12.7545 8.71966 16.2239 9.94795 19.3535C9.94822 19.3542 9.94821 19.355 9.94791 19.3557L10.3312 20.1617C11.6269 22.8865 12.6036 25.7428 13.243 28.6775L13.8513 31.4691C14.0618 32.2717 14.8056 32.8333 15.658 32.8333C16.5734 32.8333 17.3534 32.1876 17.4988 31.3094L18.3563 26.1279C18.4573 25.5176 18.9993 25.0689 19.6354 25.0689C20.2716 25.0689 20.8136 25.5176 20.9146 26.1279L21.7721 31.3094C21.9174 32.1876 22.6975 32.8333 23.6129 32.8333C24.4653 32.8333 25.2091 32.2717 25.4196 31.4692L26.0279 28.6775C26.6673 25.7428 27.6439 22.8865 28.9397 20.1617L29.323 19.3557C29.3227 19.355 29.3227 19.3542 29.3229 19.3535C30.5512 16.2239 29.2854 12.7545 26.4633 11.5674C25.126 11.0048 23.6767 11.0546 22.381 11.5915Z"
                  fill="white"
                />
              </g>
            </g>
          </g>
          <path
            d="M53.1523 11.8838H49.8652L49.8477 10.0732H52.6074C53.0938 10.0732 53.4922 10.0117 53.8027 9.88867C54.1133 9.75977 54.3447 9.5752 54.4971 9.33496C54.6553 9.08887 54.7344 8.79004 54.7344 8.43848C54.7344 8.04004 54.6582 7.71777 54.5059 7.47168C54.3594 7.22559 54.1279 7.04688 53.8115 6.93555C53.501 6.82422 53.0996 6.76855 52.6074 6.76855H50.7793V17.5H48.1426V4.70312H52.6074C53.3516 4.70312 54.0166 4.77344 54.6025 4.91406C55.1943 5.05469 55.6953 5.26855 56.1055 5.55566C56.5156 5.84277 56.8291 6.20605 57.0459 6.64551C57.2627 7.0791 57.3711 7.59473 57.3711 8.19238C57.3711 8.71973 57.251 9.20605 57.0107 9.65137C56.7764 10.0967 56.4043 10.46 55.8945 10.7412C55.3906 11.0225 54.7314 11.1777 53.917 11.207L53.1523 11.8838ZM53.0381 17.5H49.1445L50.1729 15.4434H53.0381C53.501 15.4434 53.8789 15.3701 54.1719 15.2236C54.4648 15.0713 54.6816 14.8662 54.8223 14.6084C54.9629 14.3506 55.0332 14.0547 55.0332 13.7207C55.0332 13.3457 54.9688 13.0205 54.8398 12.7451C54.7168 12.4697 54.5176 12.2588 54.2422 12.1123C53.9668 11.96 53.6035 11.8838 53.1523 11.8838H50.6123L50.6299 10.0732H53.7939L54.4004 10.7852C55.1797 10.7734 55.8066 10.9111 56.2812 11.1982C56.7617 11.4795 57.1104 11.8457 57.3271 12.2969C57.5498 12.748 57.6611 13.2314 57.6611 13.7471C57.6611 14.5674 57.4824 15.2588 57.125 15.8213C56.7676 16.3779 56.2432 16.7969 55.5518 17.0781C54.8662 17.3594 54.0283 17.5 53.0381 17.5ZM68.2256 15.4434V17.5H61.4141V15.4434H68.2256ZM62.2754 4.70312V17.5H59.6387V4.70312H62.2754ZM67.3379 9.91504V11.9189H61.4141V9.91504H67.3379ZM68.2168 4.70312V6.76855H61.4141V4.70312H68.2168ZM77.9902 15.4434V17.5H71.5479V15.4434H77.9902ZM72.4004 4.70312V17.5H69.7637V4.70312H72.4004ZM87.7285 15.4434V17.5H81.2861V15.4434H87.7285ZM82.1387 4.70312V17.5H79.502V4.70312H82.1387ZM97.8271 15.4434V17.5H91.0156V15.4434H97.8271ZM91.877 4.70312V17.5H89.2402V4.70312H91.877ZM96.9395 9.91504V11.9189H91.0156V9.91504H96.9395ZM97.8184 4.70312V6.76855H91.0156V4.70312H97.8184ZM103.979 14.8281L106.994 4.70312H109.93L105.474 17.5H103.54L103.979 14.8281ZM101.202 4.70312L104.208 14.8281L104.665 17.5H102.714L98.2842 4.70312H101.202ZM113.929 4.70312V17.5H111.301V4.70312H113.929ZM124.625 15.4434V17.5H118.183V15.4434H124.625ZM119.035 4.70312V17.5H116.398V4.70312H119.035ZM134.363 15.4434V17.5H127.921V15.4434H134.363ZM128.773 4.70312V17.5H126.137V4.70312H128.773ZM144.462 15.4434V17.5H137.65V15.4434H144.462ZM138.512 4.70312V17.5H135.875V4.70312H138.512ZM143.574 9.91504V11.9189H137.65V9.91504H143.574ZM144.453 4.70312V6.76855H137.65V4.70312H144.453ZM52.0713 38.5H49.2852L49.3027 36.4434H52.0713C52.7627 36.4434 53.3457 36.2881 53.8203 35.9775C54.2949 35.6611 54.6523 35.2012 54.8926 34.5977C55.1387 33.9941 55.2617 33.2646 55.2617 32.4092V31.7852C55.2617 31.1289 55.1914 30.5518 55.0508 30.0537C54.916 29.5557 54.7139 29.1367 54.4443 28.7969C54.1748 28.457 53.8438 28.2021 53.4512 28.0322C53.0586 27.8564 52.6074 27.7686 52.0977 27.7686H49.2324V25.7031H52.0977C52.9531 25.7031 53.7354 25.8496 54.4443 26.1426C55.1592 26.4297 55.7773 26.8428 56.2988 27.3818C56.8203 27.9209 57.2217 28.5654 57.5029 29.3154C57.79 30.0596 57.9336 30.8887 57.9336 31.8027V32.4092C57.9336 33.3174 57.79 34.1465 57.5029 34.8965C57.2217 35.6465 56.8203 36.291 56.2988 36.8301C55.7832 37.3633 55.165 37.7764 54.4443 38.0693C53.7295 38.3564 52.9385 38.5 52.0713 38.5ZM50.7793 25.7031V38.5H48.1426V25.7031H50.7793ZM68.4365 36.4434V38.5H61.625V36.4434H68.4365ZM62.4863 25.7031V38.5H59.8496V25.7031H62.4863ZM67.5488 30.915V32.9189H61.625V30.915H67.5488ZM68.4277 25.7031V27.7686H61.625V25.7031H68.4277ZM80.3896 25.7031V38.5H77.7529L72.6113 29.9219V38.5H69.9746V25.7031H72.6113L77.7617 34.29V25.7031H80.3896ZM88.1416 25.7031V38.5H85.5137V25.7031H88.1416ZM92.0791 25.7031V27.7686H81.6377V25.7031H92.0791ZM97.8359 27.8916L94.3555 38.5H91.5518L96.3066 25.7031H98.0908L97.8359 27.8916ZM100.728 38.5L97.2383 27.8916L96.957 25.7031H98.7588L103.54 38.5H100.728ZM100.569 33.7363V35.8018H93.8105V33.7363H100.569ZM112.953 36.4434V38.5H106.511V36.4434H112.953ZM107.363 25.7031V38.5H104.727V25.7031H107.363Z"
            fill="black"
          />
          <defs>
            <filter
              id="filter0_ii_1_24"
              x="-2.0348"
              y="0.465198"
              width="43.0696"
              height="43.0696"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="2.0348" dy="2.0348" />
              <feGaussianBlur stdDeviation="1.0174" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_1_24"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-2.0348" dy="-2.0348" />
              <feGaussianBlur stdDeviation="1.0174" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_1_24"
                result="effect2_innerShadow_1_24"
              />
            </filter>
            <filter
              id="filter1_di_1_24"
              x="-16.4719"
              y="-0.629299"
              width="72.2147"
              height="73.5689"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="14.1551" />
              <feGaussianBlur stdDeviation="12.9756" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.8375 0 0 0 0 0.201 0 0 0 0 0 0 0 0 0.35 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1_24"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1_24"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-3.53879" />
              <feGaussianBlur stdDeviation="2.35919" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_1_24"
              />
            </filter>
            <clipPath id="clip0_1_24">
              <rect y="2.5" width="39" height="39" rx="10" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <nav className="flex gap-6">
          <Link
            href="/home"
            className={`hover:underline ${
              pathName.startsWith("/home")
                ? "text-blue-500 underline font-semibold"
                : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/product"
            className={`hover:underline ${
              pathName.startsWith("/product")
                ? "text-blue-500 underline font-semibold"
                : "text-gray-700"
            }`}
          >
            Product
          </Link>
          <Link
            href="/research"
            className={`hover:underline ${
              pathName.startsWith("/research")
                ? "text-blue-500 underline font-semibold"
                : "text-gray-700"
            }`}
          >
            Research
          </Link>
          <Link
            href="/education"
            className={`hover:underline ${
              pathName.startsWith("/education")
                ? "text-blue-500 underline font-semibold"
                : "text-gray-700"
            }`}
          >
            Education
          </Link>
        </nav>

        {/* Sign In/Sign Up Buttons */}
        <div className="flex gap-4">
          <Link
            href="/signin"
            className="bg-white border border-gray-300 text-gray-700 px-10 py-2 rounded-full hover:bg-gray-200 m-2 "
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-blue-500 text-white px-10 py-2 rounded-full hover:bg-blue-600 m-2 "
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">{children}</main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-700 p-2 rounded-md">
                {/* Replace with an Image component if you have a logo */}
                <svg
                  width="39"
                  height="40"
                  viewBox="0 0 39 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_di_9_132)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.381 9.5332C20.7862 10.194 18.4846 10.194 16.8899 9.5332C15.5942 8.99633 14.1448 8.94654 12.8075 9.50911C9.98543 10.6963 8.71966 14.1656 9.94795 17.2952C9.94822 17.2959 9.94821 17.2967 9.94791 17.2974L10.3312 18.1035C11.6269 20.8282 12.6036 23.6846 13.243 26.6192L13.8513 29.4109C14.0618 30.2134 14.8056 30.7751 15.658 30.7751C16.5734 30.7751 17.3534 30.1293 17.4988 29.2511L18.3563 24.0696C18.4573 23.4594 18.9993 23.0106 19.6354 23.0106C20.2716 23.0106 20.8136 23.4594 20.9146 24.0696L21.7721 29.2511C21.9174 30.1293 22.6975 30.7751 23.6129 30.7751C24.4653 30.7751 25.2091 30.2134 25.4196 29.4109L26.0279 26.6192C26.6673 23.6846 27.6439 20.8282 28.9397 18.1035L29.323 17.2974C29.3227 17.2967 29.3227 17.2959 29.3229 17.2952C30.5512 14.1656 29.2854 10.6963 26.4633 9.50911C25.126 8.94654 23.6767 8.99633 22.381 9.5332Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_di_9_132"
                      x="-16.4719"
                      y="-2.68756"
                      width="72.2147"
                      height="73.569"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="14.1551" />
                      <feGaussianBlur stdDeviation="12.9756" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.8375 0 0 0 0 0.201 0 0 0 0 0 0 0 0 0.35 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9_132"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9_132"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="-3.53879" />
                      <feGaussianBlur stdDeviation="2.35919" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_9_132"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <span className="ml-2 text-lg font-bold">BELLEVILLE DENTAL</span>
            </div>
            <p className="text-gray-300">
              Exceptional dental care for all ages. Your great smile begins with
              a great dentist.
            </p>
          </div>

          {/* Column 2: Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Professional education
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Patient education
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li>
                <span className="flex justify-between">
                  <span>Monday</span>
                  <span>9:00am - 6:00pm</span>
                </span>
              </li>
              <li>
                <span className="flex justify-between">
                  <span className="text-gray-400">Tuesday</span>
                  <span className="text-gray-400">CLOSED</span>
                </span>
              </li>
              <li>
                <span className="flex justify-between">
                  <span>Wednesday</span>
                  <span>9:00am - 6:00pm</span>
                </span>
              </li>
              <li>
                <span className="flex justify-between">
                  <span className="text-gray-400">Thursday</span>
                  <span className="text-gray-400">CLOSED</span>
                </span>
              </li>
              <li>
                <span className="flex justify-between">
                  <span>Friday</span>
                  <span>9:00am - 6:00pm</span>
                </span>
              </li>
              <li>
                <span className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00am - 2:00pm</span>
                </span>
              </li>
              <li>
                <span className="flex justify-between">
                  <span>Sunday</span>
                  <span>9:00am - 2:00pm</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black mt-8 pt-4 text-center text-gray-400">
          © {new Date().getFullYear()} BELLEVILLE DENTAL.
        </div>
      </footer>
    </div>
  );
}
