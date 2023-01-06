function savetoLocalStorage(event){
    event.preventDefault();
    const expense=event.target.expense.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    localStorage.setItem('expense',expense);
    localStorage.setItem('description',description);
    localStorage.setItem('category',category);
    const obj={
        expense,
        description,
        category
    }
    localStorage.setItem(obj.description,JSON.stringify(obj));
    showNewUserOnScreen(obj);
} 
window.addEventListener("DOMContentLoaded", () =>{
    const localStorageObj = localStorage;
    const localStorageKeys=Object.keys(localStorageObj);
    for(var i=0;i<localStorageKeys.length;i++){
        const key =localStorageKeys[i];
        const userDetailsString =localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj)
    }
})
function showNewUserOnScreen(user){
    document.getElementById('description').value='';
    document.getElementById('expense').value='';
    document.getElementById('category').value='';
    if(localStorage.getItem(user.description) !== null){
        removeUserFromScreen(user.description)
    }
    const parentNode = document.getElementById('listOfUsers');
    const childHTML =`<li id=${user.description}> ${user.expense} - ${user.description}
    <button onClick=deleteUser('${user.description}')>Delete User</button>
    <button onClick=editUser('${user.description}','${user.expense}','${user.category}')>Edit User</button>
    </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;

}
function editUser(description,expense,category){

    document.getElementById('description').value=description;
    document.getElementById('expense').value=expense;
    document.getElementById('category').value=category;
    deleteUser(description)
}
function deleteUser(description){
    console.log(description);
    localStorage.removeItem(description);
    removeUserFromScreen(description);
}
function removeUserFromScreen(description){
    const parentNode = document.getElementById('listOfUsers');
    const childNodedToBeDeleted= document.getElementById(description)
    if(childNodedToBeDeleted){
        parentNode.removeChild(childNodedToBeDeleted)
    }
}