<?php
    $conn = new mysqli("localhost", "root", "", "workspace");
    if($conn->connect_error){
        die("Connection Failed!".$conn->connection_error);
    }

    $result = array('error'=>false);
    $action = '';

    if(isset($_GET['action'])){
        $action = $_GET['action'];
    }

    if($action == 'read'){
        $sql = $conn->query("SELECT * FROM revendeurs_post ORDER BY date_post DESC");
        $posts = array();
        while($row = $sql->fetch_assoc()){
            array_push($posts, $row);
        }
        $result['posts'] = $posts;
    }


    if($action == 'create'){
        $content = $_POST['content'];
        $offer = $_POST['offer'];
        $sql = $conn->query("INSERT INTO revendeurs_post (content,offer) VALUES ('$content', '$offer')");

        if($sql){
            $result['message'] = "Posted !";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Failed to post !";
        }
    }

    if($action == 'update'){
        $id = $_POST['id'];
        $content = $_POST['content'];
        $offer = $_POST['offer'];
        $sql = $conn->query("UPDATE revendeurs_post SET content='$content', offer='$offer' WHERE id='$id'");

        if($sql){
            $result['message'] = "Updated !";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Failed to update !";
        }
    }

    if($action == 'delete'){
        $id = $_POST['id'];
        $sql = $conn->query("DELETE FROM revendeurs_post WHERE id='$id'");

        if($sql){
            $result['message'] = "Deleted !";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Failed to delete !";
        }
    }


    $conn->close();
    echo json_encode($result);
?>