import "react";
import profile from "./profile.json";

const Profile = () => {
  return (
    <>
      <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg  transform  duration-200 easy-in-out bg-gray-100">
        <div className="flex justify-center px-5  -mt-12">
          <img
            className="h-48 w-48 bg-white p-2 rounded-full"
            src={profile.image}
            alt={profile.name}
          />
        </div>
        <div className="">
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">{profile.name}</h2>
            <p className="text-gray-400 mt-2">{profile.nickname}</p>
            <p className="mt-2 text-gray-600 text-center">
            👋🏼 Hello, I'm a <strong className="text-violet-600">Software Engineer</strong>. 
            Every day I enjoy <span className="text-violet-600">[ 💻,  📷,  🌎, 📚]</span> and sharing knowledge.
            </p>
          </div>
          <hr className="mt-6" />
          <div className="flex flex-wrap gap-2 justify-center items-center p-2 bg-gray-200">
              {profile.social.map((socialNetwork) => {
                return (
                  <a href={socialNetwork.link} target="_blank">
                    <button className="bg-violet-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded hover:bg-blue-600 active:bg-blue-700">
                      <i className={socialNetwork.image}></i>
                    </button>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
