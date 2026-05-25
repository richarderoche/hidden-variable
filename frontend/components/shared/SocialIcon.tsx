import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

const SocialIcon = (name) => {
  switch (name.name) {
    case 'Facebook':
      return <FaFacebookF />
    case 'Instagram':
      return <FaInstagram />
    case 'Soundcloud':
      return <FaSoundcloud />
    case 'Spotify':
      return <FaSpotify />
    case 'Tiktok':
      return <FaTiktok />
    case 'Twitter':
      return <FaXTwitter />
    case 'Threads':
      return <FaThreads />
    case 'YouTube':
      return <FaYoutube />
    case 'Github':
      return <FaGithub />
  }
}

export default SocialIcon
